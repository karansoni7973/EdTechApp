import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // replace with your initial screen
    }, 5000); // show loading for 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={['#4A00E0', '#8E2DE2']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Images/appLogo.png')} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.title}> EDU</Text>
        <Text style={styles.subtitle}>Master New Skills. Buy Once. Learn Forever.</Text>
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});

export default LoadingScreen;
