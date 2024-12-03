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
import { useRouter } from "expo-router";

export default function workoutCard({workout}) {
  const router = useRouter();
  return (
    <TouchableOpacity className="mr-4 relative" onPress={() => router.push({pathname:"/Excercise",params: {workoutName:""}})}>
        <Image source={workout.image} className="w-80 h-40 rounded-3xl"/>
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
    </TouchableOpacity>
  )
}
