import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams} from "expo-router";

export default function workoutDetail({}) {
  const {title, desc, exercises} = useLocalSearchParams();
  const exerciseArray = exercises ? exercises.split(",") : [];

  return (
  <SafeAreaView>
    <View className="">
      <Text className="text-xl">Hi this workout detail page</Text>
      <TouchableOpacity>
        <Text>Hi this is a button</Text>
      </TouchableOpacity>
      <Text>Workout Name: {title}</Text>
      <Text>{desc}</Text>
      <Text>Exercises</Text>
      {/* <Text>{exercises}</Text> */}

      {exerciseArray.map((exercise, index) => (
        <Text key={index}>
          {exercise}
        </Text>
      ))}

    </View>
  </SafeAreaView>
  
)
}
