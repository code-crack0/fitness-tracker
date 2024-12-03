import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default function WorkoutPage() {
  const [exercises, setExercises] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchExercisesForDate(selectedDate);
  }, [selectedDate]);

  async function fetchExercisesForDate(date) {
    setLoading(true);
    try {
      const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
        headers: {
          'x-rapidapi-key': 'adb92967f9mshc7a132f0c140613p1bd516jsn45c226219870',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        },
        params: { limit: 10, offset: 0, date: date.toISOString().split('T')[0] }
      });
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/images/workout1.jpg')} // Updated to use require
              style={styles.mainImage}
            />
            <Text style={styles.headerTitle}>Workout Exercises</Text>
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>Showing Workout for {selectedDate.toLocaleDateString()}</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>Select Date</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.exerciseCard}>
            <Image source={{ uri: item.gifUrl }} style={styles.exerciseImage} />
            <Text style={styles.exerciseName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          loading ? <ActivityIndicator size="large" color="#007BFF" style={styles.loader} /> : null
        }
      />

      <TouchableOpacity style={styles.subscribeButton} onPress={() => alert('Subscribed to Workout!')}>
        <Text style={styles.subscribeText}>Subscribe to Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  dateLabel: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
    marginRight: 10,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainImage: {
    width: '120%',
    height: 250,
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  exerciseCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
  },
  exerciseImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  exerciseName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  subscribeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
  },
  subscribeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
});
