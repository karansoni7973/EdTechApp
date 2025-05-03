// RazorpayWebCheckout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const RazorpayWebCheckout = ({ orderId, amount, userInfo, onPaymentSuccess, onPaymentFailure }) => {
  const htmlContent = `
    <html>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <script>
          var options = {
            "key": "rzp_test_SGHbw82smqrkO5",
            "amount": "${amount}",
            "currency": "INR",
            "name": "Your EdTech App",
            "description": "Course Purchase",
            "order_id": "${orderId}",
            "handler": function (response){
              window.ReactNativeWebView.postMessage(JSON.stringify({
                success: true,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }));
            },
            "prefill": {
              "name": "${userInfo.name}",
              "email": "${userInfo.email}",
              "contact": "${userInfo.contact}"
            },
            "theme": {
              "color": "#6200EE"
            }
          };
          var rzp = new Razorpay(options);
          rzp.open();
        </script>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.success) {
            onPaymentSuccess(data);
          } else {
            onPaymentFailure(data);
          }
        }}
      />
    </View>
  );
};

export default RazorpayWebCheckout;
