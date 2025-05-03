import React from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axiosInstance';
import { login } from '../redux/slices/userSlice';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const res = await axios.post('/api/auth/login', values);
      const { token, user } = res.data;

      dispatch(login({ email: user.email, token }));
      navigation.navigate('Home' as never);
    } catch (err: any) {
      Alert.alert('Login Failed', err?.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>
        Welcome Back!
      </Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
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

            <Button mode="contained" onPress={handleSubmit}>Login</Button>
            <Button onPress={() => navigation.navigate('Signup' as never)} style={{ marginTop: 10 }}>
              Don't have an account? Sign up
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
