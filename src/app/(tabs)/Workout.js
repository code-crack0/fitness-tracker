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
import GradientButton from "../../components/gradientButton";
import WorkoutCard from "../../components/workoutCard";

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
  }
];
const fullbodyworkout = [
  {
    id: 1,
    title: "HIIT Workout",
    image: require("../../../assets/images/bicepCurl.png"),
    desc: "Involves short bursts of intense exercise followed by brief rest periods. It's designed to burn fat, improve endurance, and boost metabolism in a short time.",
  },
  {
    id: 2,
    title: "Dumbell Workout",
    image: require("../../../assets/images/bicepCurl.png"),
    desc: "Dumbbells are used to perform various exercises that target different muscle groups, helping to build strength, improve muscle tone, and increase endurance.",
  },
  {
    id: 3,
    title: "Bodyweight Workout",
    image: require("../../../assets/images/bicepCurl.png"),
    desc: "This workout uses only your body as resistance for exercises like push-ups, squats, and planks, building strength, endurance, and flexibility without equipment.",
  }
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
              Featured Workouts
            </Text>
            <View className="pl-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                  featured.map((item, index) => {
                    return (
                      // exercise card component
                      <WorkoutCard key={index} workout={item}/>
                    )
                  }
                  )
                }
              </ScrollView>
            </View>
          </View>

          {/* top arm workouts go here */}
          <View className="mt-3">
            <View className="flex-row justify-between mb-2">
                <Text className="ml-4 text-lg font-bold">
                  Top Full Body Workouts
                </Text>
                {/* Shows list of all full body workouts */}
                <TouchableOpacity className="mr-4">
                  <Text className="text-blue-600 font-bold">
                    See All
                  </Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="h-[250px] w-full" contentContainerStyle={{paddingBottom:60}} showsVerticalScrollIndicator={false} style={{paddingBottom:60}}>
                {
                  //fullbody workout list
                  fullbodyworkout.map((workout, index)=>{
                    return (
                      <TouchableOpacity key={index} 
                      className="mx-4 p-2 mb-2 flex-row w-full">
                        <Image source={workout.image} style={{width: 80, height: 80}} 
                        className="rounded-2xl"/>
                        {/* max-w-[275] */}
                        <View className='flex-1 flex justify-center pl-2 
                        space-y-3 '>
                          <Text className="font-bold">
                            {workout.title}
                          </Text>
                          <Text className="text-xs">
                            {workout.desc.substring(0, 100)}...
                          </Text>

                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
