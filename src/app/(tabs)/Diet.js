import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { DataTable, ActivityIndicator, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
const screenWidth = Dimensions.get("window").width;

export default function Diet() {
  const [foodItems, setFoodItems] = useState([
    { key: "1", name: "Apple", calories: 95, grams: 182 },
    { key: "2", name: "Banana", calories: 105, grams: 118 },
    { key: "3", name: "Chicken Breast", calories: 165, grams: 100 },
    { key: "4", name: "Brown Rice", calories: 216, grams: 100 },
    { key: "5", name: "Broccoli", calories: 55, grams: 100 },
  ]);
  const [dailyCalories, setDailyCalories] = useState([
    2100, 1950, 2300, 2150, 2000, 2250, 2050,
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      ScanMeal(result.assets[0]);
      console.log(result.assets[0]);
    }
  };
  const loadImageBase64 = async (capturedImageURI) => {
    try {
      const base64Data = await FileSystem.readAsStringAsync(capturedImageURI, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64Data}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };
  const uploadImage = async ({ imageUri, apiUrl, token }) =>
    FileSystem.uploadAsync(apiUrl, imageUri, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "image",
      mimeType: "image/jpeg",
    });
  async function ScanMeal(image) {
    const uri = image.uri;
    const base64Image = await loadImageBase64(uri);
    const formData = new FormData();
    formData.append("image", {
      uri: uri,
      type: "image/jpeg",
      name: "meal-pic",
    });

    setIsLoading(true);
    setScanResult(null);

    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token); // Check if token is not null or undefined

      // const response = await API.post("/dietlogitems/scan/", {
      //   formData
      // }, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await uploadImage({
        imageUri: uri,
        apiUrl: "http://192.168.1.200:8000/api/v1/dietlogitems/scan/",
        token,
      });

      if (response) {
        const data = JSON.parse(response.body);
        
        console.log(data);
        setScanResult(data);
      }
    } catch (error) {
      console.error("Error scanning meal:", error);
      alert("Network error while scanning meal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleAccept = () => {
    // Handle accepting the scan result
    console.log("Scan result accepted");
    // You might want to add the scanned item to the foodItems list here
    setScanResult(null);
  };

  const handleCancel = () => {
    // Handle cancelling the scan result
    console.log("Scan result cancelled");
    setScanResult(null);
    setSelectedImage(null);
  };

  const calorieData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: dailyCalories,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.header}
        >
          <Text style={styles.title}>Diet Tracker</Text>
          <Text style={styles.subtitle}>
            Stay on top of your nutrition goals
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          <TouchableOpacity onPress={openCamera} style={styles.button}>
            <LinearGradient
              colors={["#FF9A8B", "#FF6A88", "#FF99AC"]}
              style={styles.gradient}
            >
              <FontAwesome
                name="camera"
                size={24}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Scan Meal</Text>
            </LinearGradient>
          </TouchableOpacity>

          {selectedImage && (
            <View>
              <Image source={{ uri: selectedImage }} style={styles.image} />
              {isLoading && (
                <ActivityIndicator animating={true} color="#0000ff" style={styles.loader} />
              )}
              {scanResult && (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultTitle}>Scan Result</Text>
                  <Text style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Food Name:</Text>{" "}
                    {scanResult.food_name}
                  </Text>
                  <Text style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Calories:</Text>{" "}
                    {scanResult.calories} kcal
                  </Text>
                  <Text style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Protein:</Text>{" "}
                    {scanResult.protein_grams} g
                  </Text>
                  <Text style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Carbs:</Text>{" "}
                    {scanResult.carbs_grams} g
                  </Text>
                  <Text style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Fat:</Text>{" "}
                    {scanResult.fat_grams} g
                  </Text>
                  <View style={styles.buttonContainer}>
                    <Button
                      mode="contained"
                      onPress={handleAccept}
                      style={styles.actionButton}
                    >
                      Accept
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={handleCancel}
                      style={styles.actionButton}
                    >
                      Cancel
                    </Button>
                  </View>
                </View>
              )}
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Food Log</Text>
            <DataTable style={styles.table}>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title>Food Item</DataTable.Title>
                <DataTable.Title numeric>Calories</DataTable.Title>
                <DataTable.Title numeric>Grams</DataTable.Title>
              </DataTable.Header>

              {foodItems.map((item) => (
                <DataTable.Row key={item.key}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.grams}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weekly Calorie Intake</Text>
            <LineChart
              data={calorieData}
              width={screenWidth - 80}
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
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  resultItem: {
    fontSize: 16,
    marginVertical: 4,
    color: "#444",
  },
  resultLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  loader:{
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    padding: 20,
  },
  button: {
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 20,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  resultText: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    width: "45%",
  },
});
