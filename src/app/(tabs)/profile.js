import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView ,RefreshControl} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, TextInput, Text, Card, Button, useTheme, IconButton, ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import API from "../../components/API";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigation();
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    let isMounted = true;

    const getProfileData = async () => {
      try {
        const response = await API.get("/profile/");
        if (response.data && isMounted) {
          const formattedData = [
            { label: "Email", icon: "email", labelData: response.data.email || "N/A", editable: false },
            { label: "Age", icon: "cake", labelData: response.data.age?.toString() || "N/A", editable: true },
            { label: "Gender", icon: "gender-male-female", labelData: response.data.gender || "N/A", editable: false },
            { label: "Activity Level", icon: "run", labelData: response.data.activity_level || "N/A", editable: false },
            { label: "Height (cm)", icon: "human-male-height", labelData: response.data.height_cm?.toString() || "N/A", editable: true },
            { label: "Weight (kg)", icon: "weight", labelData: response.data.weight_kg?.toString() || "N/A", editable: true },
            { label: "Target Weight (kg)", icon: "target", labelData: response.data.target_weight_kg?.toString() || "N/A", editable: true },
          ];
          setData(formattedData);
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.error("User is not authenticated. Redirecting to login page.");
          navigate.navigate("Login");
        } else {
          console.error("Error fetching profile data:", error.message);
          alert("Error fetching profile data. Please try again.");
        }
      }
    };

    getProfileData();

    return () => {
      isMounted = false;
    };
  }, [refreshing]);
const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }
  , []);
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await API.post("/logout/");
      navigate.navigate("Login"); // Redirect to login after successful logout
    } catch (error) {
      console.error("Error during logout:", error.message);
      alert("Failed to log out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateNumericInput = (text) => {
    return /^\d*$/.test(text);
  };

  const handleChange = (text, index) => {
    const newData = [...data];
    const item = newData[index];
    
    if (item.editable) {
      if (validateNumericInput(text)) {
        item.labelData = text;
        setErrors(prev => ({ ...prev, [item.label]: null }));
      } else {
        setErrors(prev => ({ ...prev, [item.label]: "Please enter a valid number" }));
      }
    } else {
      item.labelData = text;
    }
    
    setData(newData);
  };

  const handleSave = async () => {
    if (Object.values(errors).some(error => error !== null)) {
      alert("Please correct the errors before saving.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedData = {
        age: parseInt(data[1].labelData),
        height_cm: data[4].labelData !== "N/A" ? parseInt(data[4].labelData) : null,
        weight_kg: parseInt(data[5].labelData),
        target_weight_kg: data[6].labelData !== "N/A" ? parseInt(data[6].labelData) : null,
      };
      await API.put("/profile/", updatedData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile data:", error.message);
      alert("Error updating profile data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />}>
        <View style={styles.header}>
          <Avatar.Image size={100} source={{ uri: "https://example.com/profile-picture.jpg" }} />
          <View style={styles.headerText}>
            <Text style={[styles.name, { color: theme.colors.primary }]}>John Doe</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>Fitness Enthusiast</Text>
          </View>
          <IconButton
            icon={isEditing ? "content-save" : "pencil"}
            size={24}
            onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={isLoading}
          />
          <IconButton
            icon="logout"
            size={24}
            color={theme.colors.error}
            onPress={handleLogout}
            disabled={isLoading}
          />
        </View>

        <Card style={styles.infoCard}>
          <Card.Content>
            {data.map((item, index) => (
              <View key={`${item.label}-${index}`} style={styles.infoItem}>
                <MaterialCommunityIcons name={item.icon} size={24} color={theme.colors.primary} style={styles.icon} />
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.surface }]}
                  label={item.label}
                  value={item.labelData}
                  onChangeText={(text) => handleChange(text, index)}
                  disabled={!isEditing || !item.editable}
                  mode="outlined"
                  dense
                  error={!!errors[item.label]}
                  keyboardType={item.editable ? "numeric" : "default"}
                />
              </View>
            ))}
          </Card.Content>
        </Card>

        {isEditing && (
          <Button 
            mode="contained" 
            onPress={handleSave} 
            style={styles.saveButton}
            disabled={isLoading || Object.values(errors).some(error => error !== null)}
          >
            {isLoading ? (
              <ActivityIndicator animating={true} color={theme.colors.surface} />
            ) : (
              "Save Changes"
            )}
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  infoCard: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
  },
  saveButton: {},
});

export default Profile;
