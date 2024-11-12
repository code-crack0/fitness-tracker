import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          position: 'absolute', // Makes the tab bar hover over the content
          bottom: 10, // Adjust the distance from the bottom of the screen
          paddingVertical: 10, // Adjust vertical padding
          paddingBottom: 10,
          paddingTop: 10,
          height: 60, // Adjust height if necessary
          borderRadius: 30, // Adjust border radius to make it rounded
          maxWidth: 'auto',
          marginHorizontal: 20, // Adjust horizontal margin
          alignSelf: 'center', // Center the tab bar horizontally
          backgroundColor: '#F1E398', // Remove the background
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          borderTopWidth: 0, // Remove the top border of the tab bar
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
       <Tabs.Screen
        name="Workout"
        options={{
          headerShown: false,
          title: 'Workout',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bicycle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Diet"
        options={{
          headerShown:false,
          title: "Diet",
          tabBarIcon: ({color}) =><FontAwesome6 name="bowl-food" size={24} color = {color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Login"
        options={{
          headerShown: false,
          title: 'Login',
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="SignUp"
        options={{
          headerShown: false,
          title: 'Sign Up',
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        />
       
    </Tabs>
  );
}
