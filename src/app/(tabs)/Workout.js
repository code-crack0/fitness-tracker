import React from "react";
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { TextInput, Button, Text, Title } from "react-native-paper";
import { useRouter } from "expo-router";
// needs to be installed
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";


const categories = ['Arms', 'Chest', 'Legs', 'Shoulders', 'Abs']

export default function Workout() {
  const [activeCategory, setActiveCategory] = useState('Action');
  
    return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} 
    className="w-full flex-1 ">
      <SafeAreaView >
        <View className="container">
            {/* workout categories */}
          <View className="mt-3">
            <Text
              className="ml-4 mt-3 mb-4 text-[25px] font-bold "
            >
                Browse Workouts
            </Text> 
            <View className="pl-4">
                <ScrollView horizontal 
                showsHorizontalScrollIndicator={false}>
                    {
                        categories.map(item=>{
                            if(item==activeCategory){
                                //Show that button is clicked
                                
                            }else{
                                //Show that button is as is, unclicked
                                return (
                                    <TouchableOpacity 
                                    onPress={()=> setActiveCategory}
                                    key={item}
                                    className="bg-rose-400 p-3 px-4
                                    rounded-full mr-1">
                                        <Text className="font-bold"
                                        >{item}</Text>
                                    </TouchableOpacity>
                                )
                            }

                        })
                    }
                </ScrollView>
            </View>
          </View>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}
