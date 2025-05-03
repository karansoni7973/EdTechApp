import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/videos';

const HomeScreen = ({ navigation }: any) => {
  const featuredVideos = [
    {
      id: '1',
      title: 'React Native Basics',
      description: 'Learn the fundamentals of React Native.',
      thumbnail: require("../../assets/Images/cover.png"),
      price: 19.99,
    },
    {
      id: '2',
      title: 'JavaScript Masterclass',
      description: 'Master JavaScript from scratch.',
      thumbnail: require("../../assets/Images/javascript-illustration.png"),
      price: 24.99,
    },
  ];

  const theme = useTheme();

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
      <Text
        variant="titleLarge"
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: theme.colors.primary,
          marginTop: 20,
        }}
      >
        Featured Courses
      </Text>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            onPress={() => navigation.navigate('VideoDetail', { video: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('MyCourses')}
        style={{ marginBottom: 20 }}
      >
        Go to My Courses
      </Button>
    </View>
  );
};

export default HomeScreen;
