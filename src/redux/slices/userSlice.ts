import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  token: string | null;
  isSubscribed: boolean;
}

const initialState: UserState = {
  email: null,
  token: null,
  isSubscribed: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; token: string }>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state) {
      state.email = null;
      state.token = null;
      state.isSubscribed = false;
    },
    setSubscription(state, action: PayloadAction<boolean>) {
      state.isSubscribed = action.payload;
    },
  },
});

export const { login, logout, setSubscription } = userSlice.actions;
export default userSlice.reducer;
