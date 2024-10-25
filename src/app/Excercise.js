import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';


export default function Excercise() {
  const router = useRouter();
  const item = useLocalSearchParams();
  console.log(item)
  return (
    <View className="mt-20">
      <Text>Excercise</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}