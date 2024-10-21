import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

export default function exerciseCard({game}) {
  return (
    <View className="mr-4 relative">
        <Image source={game.image} className="w-80 h-60 rounded-3xl"/>
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
        </LinearGradient>
    </View>
  )
}
