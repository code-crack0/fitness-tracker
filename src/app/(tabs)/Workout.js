import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../../components/gradientButton";
import WorkoutCard from "../../components/workoutCard";
import { Searchbar } from "react-native-paper";
import ActionButton from "../../components/FAB";
import API from "../../components/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

const categories = ["Arms", "Chest", "Legs", "Shoulders", "Abs", "Back"];
const featured = [
  {
    id: 1,
    title: "Diamond Push Up",
    image: require("../../../assets/images/diamondPushUp.png"),
  },
  {
    id: 2,
    title: "Squat",
    image: require("../../../assets/images/squat.jpg"),
  },
  {
    id: 3,
    title: "Bicep Curl",
    image: require("../../../assets/images/bicepCurl.png"),
  },
];
const fullbodyworkout = [
  {
    id: 1,
    title: "HIIT Workout",
    image: require("../../../assets/images/bicepCurl.png"),
    desc: "Involves short bursts of intense exercise followed by brief rest periods.",
    exercises: ["Jumping Jacks", "Plank", "Lunges", "Mountain Climber"],
  },
  {
    id: 2,
    title: "Dumbell Workout",
    image: require("../../../assets/images/bicepCurl.png"),
    desc: "Dumbbells are used to perform various exercises targeting different muscle groups.",
    exercises: ["ex1", "ex2", "ex3", "ex4"],
  },
  {
    id: 3,
    title: "Bodyweight Workout",
    image: require("../../../assets/images/bicepCurl.png"),
    desc: "This workout uses only your body as resistance for exercises like push-ups and squats.",
    exercises: ["ex1", "ex2", "ex3", "ex4"],
  },
];

export default function Workout() {
  const [activeCategory, setActiveCategory] = useState("Action");
  const [searchQuery, setSearchQuery] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await API.get("/workouts");
      if (response.status === 401) {
        console.log("Unauthorized");
        AsyncStorage.removeItem("token");
        navigation.navigate("Login");
      } else {
        setWorkouts(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error.message);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchWorkouts();
    setIsRefreshing(false);
  };

  return (
    <LinearGradient colors={["#2193b0", "#6dd5ed"]} className="w-full flex-1">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#2193b0", "#6dd5ed"]}
            />
          }
        >
          <View className="container">
            {/* Workout Categories with "+" button */}
            <View className="mt-3 flex-row justify-between items-center">
              <Text className="ml-4 mt-3 mb-4 text-[25px] font-bold">
                Browse Workouts
              </Text>
            </View>

            {/* Workout Categories */}
            <View className="pl-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item) => (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(item)}
                    key={item}
                    className={`p-3 px-4 rounded-full mr-1 ${
                      item === activeCategory ? "bg-blue-400" : "bg-rose-400"
                    }`}
                  >
                    <Text className="font-bold">{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Searchbar */}
            <View className="mt-3 ml-4 mr-4">
              <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </View>

            {/* Featured Workouts Section */}
            <View className="mt-3 space-y-4">
              <Text className="ml-4 text-lg font-bold">Featured Workouts</Text>
              <View className="pl-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {featured.map((item, index) => (
                    <WorkoutCard key={index} workout={item} />
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Top Full Body Workouts */}
            <View className="mt-3">
              <View className="flex-row justify-between mb-2">
                <Text className="ml-4 text-lg font-bold">
                  Top Full Body Workouts
                </Text>
                <TouchableOpacity className="mr-4">
                  <Text className="text-blue-600 font-bold">See All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                className="h-[250px] w-full"
                contentContainerStyle={{ paddingBottom: 60 }}
                showsVerticalScrollIndicator={false}
              >
                {fullbodyworkout.map((workout, index) => (
                  <TouchableOpacity
                    key={index}
                    className="mx-4 p-2 mb-2 flex-row w-full"
                    onPress={() =>
                      router.push({
                        pathname: "/Exercise",
                        params: { workout },
                      })
                    }
                  >
                    <Image
                      source={workout.image}
                      style={{ width: 80, height: 80 }}
                      className="rounded-2xl"
                    />
                    <View className="flex-1 flex justify-center pl-2 space-y-3">
                      <Text className="font-bold">{workout.title}</Text>
                      <Text className="text-xs">
                        {workout.desc.substring(0, 100)}...
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
});
