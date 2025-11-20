import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useAppData, TravelMode, TripPurpose } from '@/contexts/AppDataContext';

const TRAVEL_MODES: TravelMode[] = ['Walk', 'Bus', 'Auto', 'Car', 'Bike'];
const TRIP_PURPOSES: TripPurpose[] = ['Work', 'Education', 'Shopping', 'Leisure', 'Other'];

export default function AddTripScreen() {
  const router = useRouter();
  const { addTrip } = useAppData();
  
  const [tripNumber, setTripNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [startTime, setStartTime] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState<TravelMode>('Walk');
  const [tripPurpose, setTripPurpose] = useState<TripPurpose>('Work');
  const [accompanyingTravelers, setAccompanyingTravelers] = useState('');

  const handleSave = async () => {
    if (!tripNumber || !origin || !startTime || !destination || !accompanyingTravelers) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    await addTrip({
      tripNumber,
      origin,
      startTime,
      destination,
      travelMode,
      tripPurpose,
      accompanyingTravelers,
    });

    Alert.alert('Success', 'Trip saved successfully', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <MapPin size={24} color={colors.primary} />
            <Text style={styles.formTitle}>Trip Details</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trip Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter trip number"
              placeholderTextColor={colors.textSecondary}
              value={tripNumber}
              onChangeText={setTripNumber}
              testID="trip-number-input"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Origin</Text>
            <TextInput
              style={styles.input}
              placeholder="Starting location"
              placeholderTextColor={colors.textSecondary}
              value={origin}
              onChangeText={setOrigin}
              testID="origin-input"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Start Time</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 09:00 AM"
              placeholderTextColor={colors.textSecondary}
              value={startTime}
              onChangeText={setStartTime}
              testID="start-time-input"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={styles.input}
              placeholder="Ending location"
              placeholderTextColor={colors.textSecondary}
              value={destination}
              onChangeText={setDestination}
              testID="destination-input"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Travel Mode</Text>
            <View style={styles.optionsContainer}>
              {TRAVEL_MODES.map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.optionChip,
                    travelMode === mode && styles.optionChipSelected,
                  ]}
                  onPress={() => setTravelMode(mode)}
                  activeOpacity={0.7}
                  testID={`travel-mode-${mode}`}
                >
                  <Text
                    style={[
                      styles.optionText,
                      travelMode === mode && styles.optionTextSelected,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trip Purpose</Text>
            <View style={styles.optionsContainer}>
              {TRIP_PURPOSES.map((purpose) => (
                <TouchableOpacity
                  key={purpose}
                  style={[
                    styles.optionChip,
                    tripPurpose === purpose && styles.optionChipSelected,
                  ]}
                  onPress={() => setTripPurpose(purpose)}
                  activeOpacity={0.7}
                  testID={`trip-purpose-${purpose}`}
                >
                  <Text
                    style={[
                      styles.optionText,
                      tripPurpose === purpose && styles.optionTextSelected,
                    ]}
                  >
                    {purpose}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Accompanying Travelers</Text>
            <TextInput
              style={styles.input}
              placeholder="Number of travelers"
              placeholderTextColor={colors.textSecondary}
              value={accompanyingTravelers}
              onChangeText={setAccompanyingTravelers}
              keyboardType="number-pad"
              testID="accompanying-travelers-input"
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
            testID="save-trip-button"
          >
            <Text style={styles.saveButtonText}>Save Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500' as const,
  },
  optionTextSelected: {
    color: colors.white,
    fontWeight: '600' as const,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
