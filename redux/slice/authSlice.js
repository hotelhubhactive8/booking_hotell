import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: 'ucup@gmail.com',
  password: 'ucup123',
  fullName: 'Ucup Surucup',
  telp: '08123456789',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      return (state = {
        ...state,
        isLoggedIn: true,
      });
    },
    logout: (state) => {
      return (state = {
        ...state,
        isLoggedIn: false,
      });
    },
    editUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.fullName = action.payload.fullName;
      state.telp = action.payload.telp;
    },
  },
});

export const { login, logout, editUser } = authSlice.actions;
export default authSlice.reducer;
