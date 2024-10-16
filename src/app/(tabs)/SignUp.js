import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SignUp() {
  const [pageIndex, setPageIndex] = useState(0);
  const scrollX = new Animated.Value(0);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    weight: '',
    targetWeight: '',
  });

  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const nextPage = () => {
    setPageIndex(prev => Math.min(prev + 1, 2)); // Move to the next page
  };

  const previousPage = () => {
    setPageIndex(prev => Math.max(prev - 1, 0)); // Move to the previous page
  };

  return (
    <GestureHandlerRootView>

    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: pageIndex * SCREEN_WIDTH, y: 0 }}
        style={styles.scrollView}
        >
        {/* Page 1: Name and Email */}
        <Animatable.View style={styles.page} animation="fadeIn">
          <Title>Welcome to Fitify</Title>
          <TextInput
            label="Name"
            value={userDetails.name}
            onChangeText={text => handleInputChange('name', text)}
            style={styles.input}
            mode="outlined"
            />
          <TextInput
            label="Email"
            value={userDetails.email}
            onChangeText={text => handleInputChange('email', text)}
            style={styles.input}
            keyboardType="email-address"
            mode="outlined"
            />
          <Button mode="contained" onPress={nextPage} style={styles.nextButton}>
            Next
          </Button>
        </Animatable.View>

        {/* Page 2: Password */}
        <Animatable.View style={styles.page} animation="fadeIn">
          <Title>Set Your Password</Title>
          <TextInput
            label="Password"
            value={userDetails.password}
            onChangeText={text => handleInputChange('password', text)}
            secureTextEntry
            style={styles.input}
            mode="outlined"
            />
          <View style={styles.navigationButtons}>
            <Button mode="text" onPress={previousPage} style={styles.navButton}>
              Previous
            </Button>
            <Button mode="contained" onPress={nextPage} style={styles.navButton}>
              Next
            </Button>
          </View>
        </Animatable.View>

        {/* Page 3: Weight Details */}
        <Animatable.View style={styles.page} animation="fadeIn">
          <Title>Track Your Fitness</Title>
          <TextInput
            label="Current Weight (kg)"
            value={userDetails.weight}
            onChangeText={text => handleInputChange('weight', text)}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
            />
          <TextInput
            label="Target Weight (kg)"
            value={userDetails.targetWeight}
            onChangeText={text => handleInputChange('targetWeight', text)}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
            />
          <View style={styles.navigationButtons}>
            <Button mode="text" onPress={previousPage} style={styles.navButton}>
              Previous
            </Button>
            <Button mode="contained" onPress={() => console.log('Submit', userDetails)} style={styles.navButton}>
              Submit
            </Button>
          </View>
        </Animatable.View>
      </ScrollView>

      {/* Page Indicator */}
      <View style={styles.indicatorContainer}>
        {[0, 1, 2].map((_, i) => (
          <View
          key={i}
          style={[
            styles.indicator,
            { opacity: i === pageIndex ? 1 : 0.3 },
          ]}
          />
        ))}
      </View>
    </View>
</GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width: SCREEN_WIDTH,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 15,
    width: '100%',
  },
  nextButton: {
    marginTop: 20,
    borderRadius: 25,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  navButton: {
    flex: 0.4,
    borderRadius: 25,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginHorizontal: 5,
  },
});
