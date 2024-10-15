import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import * as Animatable from 'react-native-animatable'

const AVATAR_SIZE = Dimensions.get('window').width / 2.5
const MARGIN = Dimensions.get('window').width / 18
const SCREEN_WIDTH = Dimensions.get('window').width

const App = () => {
  const firstName = 'XXXX'
  const avatar = require('../../../assets/fitify.png')
  const message = "Welcome to Fitify"

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDown" style={styles.inner}>
        <TouchableOpacity>
          <View style={styles.avatar}>
            {avatar ? (
              <Image style={styles.image} source={avatar} />
            ) : (
              <Image source={require('../../../assets/fitify.png')} style={styles.image} />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.message}>{message}</Text>
        {!firstName && (
          <Text style={styles.help}>{"Welcome to fitness tracker"}</Text>
        )}

        {/* Login Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Signup Button */}
        <TouchableOpacity style={[styles.button, styles.signupButton]}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    marginBottom: MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: AVATAR_SIZE - 16,
    height: AVATAR_SIZE - 16,
    borderRadius: (AVATAR_SIZE - 16) / 2
  },
  message: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: MARGIN * 2,
    paddingHorizontal: 16,
    textAlign: 'center'
  },
  help: {
    marginTop: 64,
    paddingHorizontal: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '200'
  },
  button: {
    backgroundColor: '#000', // Black background for the button
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 20,
    width: SCREEN_WIDTH * 0.9, // Button spans 90% of the screen width
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButton: {
    // You can keep the same style for both buttons or modify if needed
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
})

export default App
