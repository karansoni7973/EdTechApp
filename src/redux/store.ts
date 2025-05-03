import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import videosReducer from './slices/videosSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    videos: videosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
