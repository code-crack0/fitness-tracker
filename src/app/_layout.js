import { Stack } from "expo-router";
import Excercise from "./Excercise";


export default function Layout() {
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Excercise"  options={{headerShown:false,presentation:"fullScreenModal"}} />
      </Stack>
    );
  }