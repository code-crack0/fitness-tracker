import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function gradientButton(props) {
  return (
    <LinearGradient
      colors={["#17658a", "#4aa9bf"]}
      end={{ x: 1, y: 1 }}
      start={{ x: 0.1, y: 0.2 }}
      className={"rounded-full ${props.containerClass}"}
    >
      <TouchableOpacity className={'p-3 px-4 s{props.buttonClass}'}>
        <Text className="text-white font-bold">
          {props.value}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
