import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import VideoDetailScreen from './screens/VideoDetailScreen';
import MyCoursesScreen from './screens/MyCoursesScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentScreen from './screens/PaymentScreen';
import LoadingScreen from './screens/LoadingScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
      <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
