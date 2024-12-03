import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const API = axios.create({
    baseURL: 'http://192.168.1.200:8000/api/v1/',
});

API.interceptors.request.use(
    async (request) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                request.headers['Authorization'] = `Token ${token}`;
            }
            console.log("Request Headers", request.headers); // Log to verify
        } catch (error) {
            console.error("Error retrieving token:", error);
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {


        if (error.response && error.response.status === 401) {
            console.error("Token expired. Redirecting to login page.");

            // Remove token from AsyncStorage
            await AsyncStorage.removeItem('token');
            
        
        }
        
        console.error("Error Response", JSON.stringify(error, null, 2));
        return Promise.reject(error);
    }
);

export default API;
