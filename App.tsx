import React from 'react';
import 'react-native-reanimated';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51RHS3ORhtnwJnAFdjMPJ9NpClL8aKsxON6CeTojuYmJFIAsFcHSUWpUHlE66QPaYk4U3ANGxbruxMeoBqgpsXqiF00V994DxwF">
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </StripeProvider>

    
  );
}
