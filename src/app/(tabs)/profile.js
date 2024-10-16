import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Correct import

const Profile = () => {
  // Initialize the state with the profile data
  const [data, setData] = useState([
    { label: "Height", labelData: "176cm" },
    { label: "Gender", labelData: "Male" },
    { label: "Weight", labelData: "120kg" },
    { label: "Age", labelData: "69" },
    { label: "Goal Weight", labelData: "75kg" },
    { label: "Daily Calories", labelData: "1738" },
  ]);

  // Function to update the data state when the user edits a TextInput
  const handleChange = (text, index) => {
    const newData = [...data];
    newData[index].labelData = text;
    setData(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.parent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <Text style={styles.headingText}>John Doe</Text>
          <Avatar.Text size={50} label="XD" />
        </View>

        <FlatList
          style={styles.FlatList}
          data={data}
          keyExtractor={(item) => item.label}
          renderItem={({ item, index }) => (
            <TextInput
              style={styles.listInput}
              label={item.label}
              value={item.labelData} // Controlled value
              onChangeText={(text) => handleChange(text, index)} // Update value on change
              editable={true}
            />
          )}
          keyboardShouldPersistTaps="handled" // Prevents accidental keyboard dismiss
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: "column",
    flex: 1,
  },
  container: {
    padding: 30,
    flex: 1,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headingText: {
    fontSize: 25,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  FlatList: {
    marginTop: 10,
  },
  listInput: {
    marginTop: 15,
    marginBottom: 15,
  },
});

export default Profile;
