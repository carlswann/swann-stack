import { createSlice } from '@reduxjs/toolkit';
import { getPersistedState } from './utils/getPersistedState';
import { AuthenticationStateType } from './types';

const defaultState: AuthenticationStateType = {
  isAuthenticated: false,
  authToken: null,
  currentUser: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: getPersistedState() || defaultState,
  reducers: {
    login: (state, action) => {
      const { authToken, currentUser } = action.payload;

      state.isAuthenticated = true;
      state.authToken = authToken;
      state.currentUser = currentUser;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = null;
      state.currentUser = null;
    },
  },
});
