import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarStyle: {
          paddingVertical: 20, // Increase vertical padding
          paddingBottom: 10, // Increase bottom padding
          paddingTop: 10, // Increase top padding
          height: 70, // Adjust height if necessary
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
        <Tabs.Screen
        name="Workout"
        options={{
          headerShown: false,
          title: 'Workout',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
