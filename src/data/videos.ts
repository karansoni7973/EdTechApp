import { ImageSourcePropType } from 'react-native';

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: any;
  price: number;
};

export const videos: Video[] = [
  {
    id: '1',
    title: 'React Native Mastery',
    description: 'Full course for beginners',
    thumbnail: require('../../assets/Images/cover.png'),
    price: 1999,
  },
  {
    id: '2',
    title: 'JavaScript Masterclass',
    description: 'Master JavaScript from scratch.',
    thumbnail: require('../../assets/Images/javascript-illustration.png'),
    price: 2499,
  },
  {
    id: '3',
    title: 'Core Java Full course',
    description: 'Become a pro at Core Java along with oops concepts',
    thumbnail: require('../../assets/Images/java.png'),
    price: 1499,
  },
];
