import { ImageSourcePropType } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  VideoDetail: {
    video: {
      id: string;
      title: string;
      description: string;
      thumbnail: ImageSourcePropType;
      price: number;
    };
  };
  MyCourses: undefined;
};
