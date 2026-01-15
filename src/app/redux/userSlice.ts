// src/redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  phone: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  phone: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
  },
});

export const { updateUserData } = userSlice.actions;

// Add selector
export const selectUserData = (state: { user: UserState }) => state.user;

export default userSlice.reducer;