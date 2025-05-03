import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface VideosState {
  purchased: Video[];
}

const initialState: VideosState = {
  purchased: [],
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    purchaseVideo(state, action: PayloadAction<Video>) {
      const exists = state.purchased.some(video => video.id === action.payload.id);
      if (!exists) {
        state.purchased.push(action.payload);
      }
    },
    clearVideos(state) {
      state.purchased = [];
    },
  },
});

export const { purchaseVideo, clearVideos } = videosSlice.actions;
export default videosSlice.reducer;
