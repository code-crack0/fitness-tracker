import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    Text
  } from "react-native";
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

export default function workoutCard({workout}) {
  return (
    <View className="mr-4 relative">
        <Image source={workout.image} className="w-80 h-60 rounded-3xl"/>
        <LinearGradient colors={['transparent', '#00000099']}
            className="absolute p-4 h-full w-full flex justify-between rounded-3xl"
        >
            <View className="flex-row justify-end">
                <TouchableOpacity
                    className="p-3 rounded-full"
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
                >
                    
                </TouchableOpacity>
            </View>
            <View>
              <Text className="text-xl font-bold text-gray-300">
                {workout.title}
              </Text>
            </View>
        </LinearGradient>
    </View>
  )
}
