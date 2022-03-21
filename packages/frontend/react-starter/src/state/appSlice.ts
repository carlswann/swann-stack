import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStateType } from './types';

const defaultState: AppStateType = {
  openNavigationMenuItem: null, // for active default menu
  isNavigationDrawerOpen: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: {
    setNavigationMenuItemOpen: (state, action: PayloadAction<string | null>) => {
      state.openNavigationMenuItem = action.payload;
    },
    setNavigationDrawerState: (state, action: PayloadAction<boolean>) => {
      state.isNavigationDrawerOpen = action.payload;
    },
  },
});
