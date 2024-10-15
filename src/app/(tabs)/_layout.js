import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: 'none'}
        }}
        />
      <Tabs.Screen
        name="Home"
        options={{
            headerShown:false,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
            headerShown:false,
            title: 'Profile',
            tabBarIcon: ({color}) => <FontAwesome size={28} name="user" color={color}/>
        }}
        />
    </Tabs>
  );
}