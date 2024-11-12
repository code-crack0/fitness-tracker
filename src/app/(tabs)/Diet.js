import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const screenWidth = Dimensions.get("window").width;

export default function Diet({ route }) {
  const [foodItems, setFoodItems] = useState([]);
  const [dailyCalories, setDailyCalories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const calorieData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: dailyCalories.length ? dailyCalories : [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Diet Tracker</Text>
        
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Text style={styles.buttonText}>Scan Meal</Text>
          <FontAwesome name="camera" size={50} color="white" style={styles.icon} />
        </TouchableOpacity>

        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text style={styles.heading}>No Image Selected</Text>
        )}

        {/* List of food items with calorie count */}
        <FlatList
          data={foodItems}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemCalories}>{item.calories} kcal</Text>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />

        <Text style={styles.graphTitle}>Weekly Calorie Intake</Text>
        <LineChart
          data={calorieData}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  button: {
    maxWidth: 150,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#F5853F",
    borderRadius: 20,
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
  },
  buttonText: {
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  itemCalories: {
    fontSize: 16,
    fontWeight: "bold",
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  chart: {
    borderRadius: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});
