import React from 'react';
import { View, ImageSourcePropType } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { purchaseVideo } from '../redux/slices/videosSlice';
import { setSubscription } from '../redux/slices/userSlice';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

type VideoDetailRouteProp = {
  key: string;
  name: string;
  params: {
    video: {
      id: string;
      title: string;
      description: string;
      thumbnail: ImageSourcePropType;
      price: number;
    };
  };
};

const VideoDetailScreen = () => {
  const route = useRoute<VideoDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const { video } = route.params;

  const handleBuyVideo = () => {
    navigation.navigate('Payment', { videoId: video.id });
  };
  

  const handleSubscribe = () => {
    dispatch(setSubscription(true));
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <Card>
        <Card.Cover source={video.thumbnail} />
        <Card.Title title={video.title} />
        <Card.Content>
          <Text variant="bodyMedium">{video.description}</Text>
          <Text variant="titleMedium" style={{ marginTop: 10 }}>
            Price: ${video.price}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleBuyVideo}>Buy Video</Button>
          <Button onPress={handleSubscribe}>Subscribe</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default VideoDetailScreen;
