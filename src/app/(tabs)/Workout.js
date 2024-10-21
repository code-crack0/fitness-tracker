import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text, Title } from "react-native-paper";
import { useRouter } from "expo-router";
// needs to be installed
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import GradientButton from "../components/gradientButton";
import ExerciseCard from "../components/exerciseCard";

const categories = ["Arms", "Chest", "Legs", "Shoulders", "Abs", "Back"];
const featured = [
  {
    id: 1,
    title: "Diamond Push Up",
    image: require("../../../assets/images/diamondPushUp.png"),
    desc: "A bodyweight exercise that targets the chest, triceps, and shoulders, with an added emphasis on the triceps. Your hands are positioned close together, forming a diamond shape by touching your thumbs and index fingers. This hand placement increases the intensity on the triceps while still engaging the chest and core.",
  },
  {
    id: 2,
    title: "Squat",
    image: require("../../../assets/images/squat.jpg"),
    desc: "A bodyweight exercise that focuses on strengthening the legs, targeting the quads, hamstrings, and glutes. It involves starting in a squat position, where the knees are bent, and the hips are pushed back as if sitting on an invisible chair, then driving through the heels to stand back up. It's a fundamental movement for building lower body strength, and improving balance and mobility. ",
  },
  {
    id: 3,
    title: "Bicep Curl",
    image: require("../../../assets/images/bicepCurl.png"),
    desc: "A bicep curl is a strength exercise where you lift a weight by bending your elbow, targeting the biceps for arm strength and muscle definition.",
  },
  {
    id: 4,
    title: "Diamond Push Up",
    image: require("../../../assets/images/diamondPushUp.png"),
    desc: "A bodyweight exercise that targets the chest, triceps, and shoulders, with an added emphasis on the triceps. Your hands are positioned close together, forming a diamond shape by touching your thumbs and index fingers. This hand placement increases the intensity on the triceps while still engaging the chest and core. ",
  },
];

export default function Workout() {
  const [activeCategory, setActiveCategory] = useState("Action");


  return (
    <LinearGradient colors={["#2193b0", "#6dd5ed"]} className="w-full flex-1 ">
      <SafeAreaView>
        <View className="container">
          {/* workout categories */}
          <View className="mt-3">
            <Text className="ml-4 mt-3 mb-4 text-[25px] font-bold ">
              Browse Workouts
            </Text>
            <View className="pl-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item) => {
                  if (item == activeCategory) {
                    //Show that button is clicked
                    return (
                      <GradientButton
                        key={item}
                        containerClass="mr-2"
                        value={item}
                      />
                    );
                  } else {
                    //Show that button is as is, unclicked
                    return (
                      <TouchableOpacity
                        onPress={() => setActiveCategory}
                        key={item}
                        className="bg-rose-400 p-3 px-4
                                    rounded-full mr-1"
                      >
                        <Text className="font-bold">{item}</Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>

          {/* features workout section */}
          <View className="mt-3 space-y-4">
            <Text
              className="ml-4 text-lg font-bold"
            >
              Featured Exercises
            </Text>
            <View className="pl-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                  featured.map((item, index) => {
                    return (
                      // exercise card component
                      <ExerciseCard key={index} game={item}/>
                      
                    )
                  }
                  )
                }
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
