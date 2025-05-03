import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import VideoCard from '../components/VideoCard';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types'; // Adjust path

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyCourses'>;

const MyCoursesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const myVideos = useSelector((state: RootState) => state.videos.purchased);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="titleLarge" style={{ marginTop: 20, alignItems:'center' }}>
        My Purchased Courses
      </Text>

      {myVideos.length === 0 ? (
        <Text>No courses purchased yet.</Text>
      ) : (
        <FlatList
          data={myVideos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoCard
              title={item.title}
              thumbnail={item.thumbnail}
              onPress={() => navigation.navigate('VideoPlayer', { videoId: item.id })}  // Passing videoId
            />
          )}
        />
      )}
    </View>
  );
};

export default MyCoursesScreen;
