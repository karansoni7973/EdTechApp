import React from 'react';
import { Card } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';

type Props = {
  title: string;
  thumbnail: ImageSourcePropType; // Allow both remote URL or local image
  onPress: () => void;
};

const VideoCard = ({ title, thumbnail, onPress }: Props) => (
  <Card onPress={onPress} style={{ marginVertical: 10 }}>
    <Card.Cover
      source={thumbnail}
    />
    <Card.Title title={title} />
  </Card>
);

export default VideoCard;
