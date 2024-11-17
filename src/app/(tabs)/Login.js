import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';
import axios from 'axios';
import API from '../../components/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigate = useNavigation();
  async function handleLogin() {
    try {
      const response = await API.post('/login/',{

        email: email,
        password: password,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.status === 200) {
        console.log('User logged in successfully');
        // alert('User logged in successfully');
        // need to add the token received to axios headers
        API.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        await AsyncStorage.setItem('token', response.data.token);
        navigate.navigate('Home');
      }
    
  } catch (error) {
    alert('Invalid email or password');
  }
}
  const router = useRouter()
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image 
          source={require("../../../assets/fitify.png")} // Replace with your logo
          style={styles.logo}
        />
        <Title style={styles.title}>Fitify</Title>
        <Text style={styles.subtitle}>Please login to continue</Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={secureTextEntry}
          right={<TextInput.Icon name={secureTextEntry ? "eye" : "eye-off"} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
          style={styles.input}
          mode="outlined"
        />

        {/* Login Button */}
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          contentStyle={styles.loginButtonContent}
        >
          Login
        </Button>

        {/* Signup Prompt */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Button
            mode="text"
            onPress={() => router.push('/SignUp')}
            labelStyle={styles.signupButtonLabel}
          >
            Sign up
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 25,
  },
  loginButtonContent: {
    paddingVertical: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Ensure vertical alignment of text and button
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
  },
  signupButtonLabel: {
    fontSize: 16,
    color: '#000',
  },
});
