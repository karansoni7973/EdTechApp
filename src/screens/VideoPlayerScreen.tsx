import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';

const VideoPlayerScreen = () => {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const videoUri = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing</Text>
      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          isLooping
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  videoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    marginBottom: 30,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    backgroundColor: 'purple',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VideoPlayerScreen;
