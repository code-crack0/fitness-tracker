import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Animated ,RefreshControl} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { TextInput, Button, Text, Title, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import API from '../../components/API';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SignUp() {
  const navigate = useNavigation();
  const [pageIndex, setPageIndex] = useState(0);
  const activity_data = [
    { title: 'Sedentary', icon: 'bed' },
    { title: 'Lightly Active', icon: 'walk' },
    { title: 'Moderately Active', icon: 'run' },
    { title: 'Very Active', icon: 'bicycle' },
    { title: 'Extremely Active', icon: 'human-handsup' },
  ]
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    weight: '',
    targetWeight: '',
    age: '',
    height: '',
    gender: '',
    activityLevel: '',
  });
  
  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const nextPage = () => {
    setPageIndex(prev => Math.min(prev + 1, 4)); // Adjusted for 5 pages
  };

  const previousPage = () => {
    setPageIndex(prev => Math.max(prev - 1, 0));
  };

  const SignUp = async () => {
    try {
      console.log(userDetails); 
      const response = await API.post(
        '/signup/',
        {
          email: userDetails.email,
          password: userDetails.password,
          name: userDetails.name,
          weight_kg: parseInt(userDetails.weight),
          target_weight_kg: parseInt(userDetails.targetWeight),
          age: parseInt(userDetails.age),
          height_cm: parseInt(userDetails.height),
          gender: userDetails.gender,
          activity_level: userDetails.activityLevel,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        console.log('User signed up successfully');
        alert('Account has been created');
        navigate.navigate('Login');
      }
    } catch (error) {
      alert(error.response?.data?.email || 'Error during sign-up');
    }
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

          {/* Page 3: Age and Height */}
          <Animatable.View style={styles.page} animation="fadeIn">
            <Title>Tell Us More About You</Title>
            <TextInput
              label="Age"
              value={userDetails.age}
              onChangeText={text => handleInputChange('age', text)}
              style={styles.input}
              keyboardType="numeric"
              mode="outlined"
            />
            <TextInput
              label="Height (cm)"
              value={userDetails.height}
              onChangeText={text => handleInputChange('height', text)}
              style={styles.input}
              keyboardType="numeric"
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

          {/* Page 4: Gender and Activity Level */}
          <Animatable.View style={styles.page} animation="fadeIn">
            <Title>Customize Your Experience</Title>
            <Text>Select Your Gender</Text>
            <RadioButton.Group
              onValueChange={value => handleInputChange('gender', value)}
              value={userDetails.gender}
            >
              <View style={styles.radioButtonContainer}>
                <View style={styles.radioButton}>
                  <RadioButton value="Male" />
                  <Text>Male</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="Female" />
                  <Text>Female</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="Other" />
                  <Text>Other</Text>
                </View>
              </View>
            </RadioButton.Group>

            <Text style={{ marginTop: 20 }}>Activity Level</Text>
            <View style={styles.pickerContainer}>
              {/* <Picker
                selectedValue={userDetails.activityLevel}
                onValueChange={value => handleInputChange('activityLevel', value)}
              >
                <Picker.Item label="Select Activity Level" value="" />
                <Picker.Item label="Sedentary" value="Sedentary" />
                <Picker.Item label="Lightly Active" value="Lightly Active" />
                <Picker.Item label="Moderately Active" value="Moderately Active" />
                <Picker.Item label="Very Active" value="Very Active" />
                <Picker.Item label="Extremely Active" value="Extremely Active" />
              </Picker> */}
              <SelectDropdown
  data={activity_data}
  onSelect={(selectedItem, index) => {
    console.log(`Selected: ${selectedItem.title}, Index: ${index}`);
    handleInputChange('activityLevel', selectedItem.title);
  }}
  buttonStyle={styles.dropdownButtonStyle}
  buttonTextStyle={styles.dropdownButtonTxtStyle}
  renderCustomizedButtonChild={(selectedItem, isOpened) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        {selectedItem && (
          <Icon
            name={selectedItem.icon}
            style={[
              styles.dropdownButtonIconStyle,
              { color: isOpened ? '#007BFF' : '#151E26' },
            ]}
          />
        )}
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem && selectedItem.title) || 'Select your Activity Level'}
        </Text>
        <Icon
          name={isOpened ? 'chevron-up' : 'chevron-down'}
          style={styles.dropdownButtonArrowStyle}
        />
      </View>
    );
  }}
  renderButton={(selectedItem, isOpened) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        {selectedItem && (
          <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
        )}
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem && selectedItem.title) || 'Select your Activity Level'}
        </Text>
        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
      </View>
    );
  }}
  renderItem={(item, index, isSelected) => {
    return (
      <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
        <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
      </View>
    );
  }}
  renderCustomizedRowChild={(item, index, isSelected) => {
    return (
      <View
        style={[
          styles.dropdownItemStyle,
          isSelected && { backgroundColor: '#D2D9DF' },
        ]}
      >
        <Icon
          name={item.icon}
          style={[
            styles.dropdownItemIconStyle,
            { color: isSelected ? '#007BFF' : '#151E26' },
          ]}
        />
        <Text
          style={[
            styles.dropdownItemTxtStyle,
            isSelected && { color: '#007BFF' },
          ]}
        >
          {item.title}
        </Text>
      </View>
    );
  }}
  dropdownStyle={styles.dropdownMenuStyle}
  rowStyle={styles.dropdownRowStyle}
  rowTextStyle={styles.dropdownItemTxtStyle}
  showsVerticalScrollIndicator={false}
/>

            </View>

            <View style={styles.navigationButtons}>
              <Button mode="text" onPress={previousPage} style={styles.navButton}>
                Previous
              </Button>
              <Button mode="contained" onPress={nextPage} style={styles.navButton}>
                Next
              </Button>
            </View>
          </Animatable.View>

          {/* Page 5: Weight Details */}
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
              <Button mode="contained" onPress={SignUp} style={styles.navButton}>
                Submit
              </Button>
            </View>
          </Animatable.View>
        </ScrollView>

        {/* Page Indicator */}
        <View style={styles.indicatorContainer}>
          {[0, 1, 2, 3, 4].map((_, i) => (
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
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
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
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'left',
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,
    color: '#6C757D',
  },
  dropdownButtonIconStyle: {
    fontSize: 24,
    marginRight: 8,
    color: '#6C757D',
  },
  dropdownMenuStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'left',
  },
  dropdownItemIconStyle: {
    fontSize: 24,
    marginRight: 12,
    color: '#6C757D',
  },
});
