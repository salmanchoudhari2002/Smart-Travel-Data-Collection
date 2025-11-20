import { useState, useEffect, useCallback, useMemo } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type HouseholdMember = {
  id: string;
  name: string;
  age: string;
  gender: string;
  occupation: string;
  householdSize: string;
};

export type TravelMode = 'Walk' | 'Bus' | 'Auto' | 'Car' | 'Bike';
export type TripPurpose = 'Work' | 'Education' | 'Shopping' | 'Leisure' | 'Other';

export type Trip = {
  id: string;
  tripNumber: string;
  origin: string;
  startTime: string;
  destination: string;
  travelMode: TravelMode;
  tripPurpose: TripPurpose;
  accompanyingTravelers: string;
  timestamp: number;
};

const HOUSEHOLD_KEY = 'household_members';
const TRIPS_KEY = 'trips_data';

export const [AppDataProvider, useAppData] = createContextHook(() => {
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [householdData, tripsData] = await Promise.all([
        AsyncStorage.getItem(HOUSEHOLD_KEY),
        AsyncStorage.getItem(TRIPS_KEY),
      ]);

      if (householdData) {
        setHouseholdMembers(JSON.parse(householdData));
      }
      if (tripsData) {
        setTrips(JSON.parse(tripsData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addHouseholdMember = useCallback(async (member: Omit<HouseholdMember, 'id'>) => {
    const newMember: HouseholdMember = {
      ...member,
      id: Date.now().toString(),
    };
    const updated = [...householdMembers, newMember];
    setHouseholdMembers(updated);
    await AsyncStorage.setItem(HOUSEHOLD_KEY, JSON.stringify(updated));
  }, [householdMembers]);

  const deleteHouseholdMember = useCallback(async (id: string) => {
    const updated = householdMembers.filter((m) => m.id !== id);
    setHouseholdMembers(updated);
    await AsyncStorage.setItem(HOUSEHOLD_KEY, JSON.stringify(updated));
  }, [householdMembers]);

  const addTrip = useCallback(async (trip: Omit<Trip, 'id' | 'timestamp'>) => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    const updated = [newTrip, ...trips];
    setTrips(updated);
    await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(updated));
  }, [trips]);

  const deleteTrip = useCallback(async (id: string) => {
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(updated));
  }, [trips]);

  return useMemo(() => ({
    householdMembers,
    trips,
    isLoading,
    addHouseholdMember,
    deleteHouseholdMember,
    addTrip,
    deleteTrip,
  }), [householdMembers, trips, isLoading, addHouseholdMember, deleteHouseholdMember, addTrip, deleteTrip]);
});