import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar, TextInput } from "react-native-paper";
export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openCamera = async () => {
    // Ask for camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Store the selected image
    }
  };

  const openImagePicker = async () => {
    // Ask for permission to access the gallery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    // Code that displays the ImagePicker
    // if (!result.cancelled) {
    //   setSelectedImage(result.uri); // Store the selected image
    // }
  };

  return (
    <SafeAreaView style={[styles.container]}>

      

      <TouchableOpacity
        onPress={openCamera} // Open the camera to capture a photo
        style={[styles.button]}
      >
        <Text style={styles.buttonText}>Scan Meal</Text>
        <FontAwesome
          name="camera"
          size={50}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <Text style={[styles.heading]}>No Image Selected</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "left",
  },
  button: {
    maxWidth: 150,
    marginLeft: 20,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#F5853F",
    borderRadius: 20,
  },
  buttonText: {
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});
