'use client'

import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Card, Button, Searchbar, Chip, useTheme, ActivityIndicator } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Mock data for subscribed workouts
const mockWorkouts = [
  { id: '1', name: 'Full Body Blast', duration: '45 min', difficulty: 'Intermediate', category: 'Strength' },
  { id: '2', name: 'Cardio Kickboxing', duration: '30 min', difficulty: 'Advanced', category: 'Cardio' },
  { id: '3', name: 'Yoga Flow', duration: '60 min', difficulty: 'Beginner', category: 'Flexibility' },
  { id: '4', name: 'HIIT Challenge', duration: '20 min', difficulty: 'Advanced', category: 'HIIT' },
  { id: '5', name: 'Core Crusher', duration: '15 min', difficulty: 'Intermediate', category: 'Core' },
]

const MyWorkout = () => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredWorkouts, setFilteredWorkouts] = useState(mockWorkouts)
  const [loadingStates, setLoadingStates] = useState({})

  const handleSearch = (query) => {
    setSearchQuery(query)
    const filtered = mockWorkouts.filter(workout => 
      workout.name.toLowerCase().includes(query.toLowerCase()) ||
      workout.category.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredWorkouts(filtered)
  }

  const handleStartWorkout = (workoutId) => {
    setLoadingStates(prevStates => ({ ...prevStates, [workoutId]: true }))
    // Simulating an API call or loading process
    setTimeout(() => {
      setLoadingStates(prevStates => ({ ...prevStates, [workoutId]: false }))
      console.log(`Starting workout with id: ${workoutId}`)
      // Here you would typically navigate to the workout screen or start the workout
    }, 1500)
  }

  const renderWorkoutItem = ({ item }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Text variant="titleMedium" style={styles.workoutName}>{item.name}</Text>
        <View style={styles.workoutDetails}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="clock-outline" size={16} color={theme.colors.primary} />
            <Text variant="bodyMedium" style={styles.detailText}>{item.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="stairs" size={16} color={theme.colors.primary} />
            <Text variant="bodyMedium" style={styles.detailText}>{item.difficulty}</Text>
          </View>
        </View>
        <Chip icon="tag" style={styles.categoryChip}>{item.category}</Chip>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => handleStartWorkout(item.id)}
          disabled={loadingStates[item.id]}
        >
          {loadingStates[item.id] ? <ActivityIndicator animating={true} color={theme.colors.surface} /> : 'Go to Workout'}
        </Button>
      </Card.Actions>
    </Card>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.title}>My Workouts</Text>
      <Searchbar
        placeholder="Search workouts"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredWorkouts}
        renderItem={renderWorkoutItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.workoutList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  workoutList: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  workoutName: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  workoutDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
})

export default MyWorkout