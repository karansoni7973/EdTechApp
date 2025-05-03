import React from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axiosInstance'; // use the axios instance

const SignupScreen = () => {
  const navigation = useNavigation();

  const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleSignup = async (values: { name: string; email: string; password: string }) => {
    try {
      const res = await axios.post('api/auth/register', values);
      Alert.alert('Success', res.data.message);
      navigation.navigate('Login' as never);
    } catch (err: any) {
      Alert.alert('Signup Failed', err?.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>Create an Account</Text>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label="Name"
              mode="outlined"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              style={{ marginBottom: 8 }}
            />
            {touched.name && errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

            <TextInput
              label="Email"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ marginBottom: 8 }}
            />
            {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

            <TextInput
              label="Password"
              mode="outlined"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              style={{ marginBottom: 8 }}
            />
            {touched.password && errors.password && (
              <Text style={{ color: 'red' }}>{errors.password}</Text>
            )}

            <Button mode="contained" onPress={handleSubmit}>Sign Up</Button>
            <Button onPress={() => navigation.navigate('Login' as never)} style={{ marginTop: 10 }}>
              Already have an account? Log in
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupScreen;
