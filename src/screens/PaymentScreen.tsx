import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Button } from 'react-native-paper';
import axios from '../api/axiosInstance';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { purchaseVideo } from '../redux/slices/videosSlice'; // adjust path
import { videos } from '../data/videos';

export default function PaymentScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const [checkoutHtml, setCheckoutHtml] = useState(null);
  const webviewRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Pass video data from previous screen
  
    const { videoId } = route.params;
  const video = videos.find(v => v.id === videoId);

  if (!video) {
    return (
      <View><Text>Video not found.</Text></View>
    );
  }
  


  const createRazorpayOrder = async () => {
    console.log("VIDEO OBJECT:", video);
    const response = await axios.post('/create-razorpay-order', {
      amount: video.price, // Dynamic price
      currency: 'INR',
      receipt: 'receipt_' + Math.floor(Math.random() * 1000),
    });
    return response.data;
  };

  const verifyPayment = async (paymentData) => {
    const response = await axios.post('/verify-razorpay-payment', paymentData);
    return response.data;
  };

  const getInjectedHtml = (order) => {
    return `
      <html>
        <head><script src="https://checkout.razorpay.com/v1/checkout.js"></script></head>
        <body>
          <script>
            var options = {
              key: "${order.key_id}",
              amount: "${order.amount}",
              currency: "${order.currency}",
              name: "Your EdTech App",
              description: "Course Purchase",
              image: "https://your-app-logo.com/logo.png",
              order_id: "${order.id}",
              prefill: {
                name: "Student Name",
                email: "student@example.com",
                contact: "9876543210"
              },
              theme: { color: "#6200EE" },
              handler: function (response){
                window.ReactNativeWebView.postMessage(JSON.stringify(response));
              },
              modal: {
                ondismiss: function(){
                  window.ReactNativeWebView.postMessage("dismissed");
                }
              }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
          </script>
        </body>
      </html>
    `;
  };

  const handlePayPress = async () => {
    try {
      setLoading(true);
      const order = await createRazorpayOrder();
      const html = getInjectedHtml(order);
      setCheckoutHtml(html);
    } catch (error) {
      Alert.alert("Error", "Could not initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleWebViewMessage = async (event) => {
    const data = event.nativeEvent.data;

    if (data === "dismissed") {
      setCheckoutHtml(null);
      return;
    }

    try {
      const paymentData = JSON.parse(data);
      const verification = await verifyPayment(paymentData);
      setCheckoutHtml(null);

      if (verification.status === "success") {
        // Add purchased course to Redux
        dispatch(purchaseVideo(video));

        // Navigate to MyCoursesScreen
        navigation.navigate('MyCourses');

        Alert.alert("Success", "Payment verified and course added!");
      } else {
        Alert.alert("Warning", "Payment completed but verification failed");
      }
    } catch (error) {
      setCheckoutHtml(null);
      Alert.alert("Error", "Payment verification failed");
    }
  };

  return (
    <View style={styles.container}>
      {checkoutHtml ? (
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: checkoutHtml }}
          onMessage={handleWebViewMessage}
          javaScriptEnabled
          domStorageEnabled
          style={{ flex: 1 }}
        />
      ) : (
        <Button
          mode="contained"
          onPress={handlePayPress}
          disabled={loading}
          loading={loading}
          style={styles.button}
        >
          {loading ? 'Processing...' : `Pay ₹${(video.price / 100).toFixed(2)}`}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});
