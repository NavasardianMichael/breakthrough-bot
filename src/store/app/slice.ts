import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { STATE_SLICE_NAMES } from 'helpers/constants/store';
import { AppActionPayloads, AppSlice } from './types';

const initialState: AppSlice = {
  isNavbarOpened: false
};

export const appSlice = createSlice({
  name: STATE_SLICE_NAMES.app,
  initialState,
  reducers: {
    setAppOptions: (state, { payload }: PayloadAction<AppActionPayloads['setAppOptions']>) => {
      return {
        ...state,
        ...payload,
      };
    },
    toggleNavbar: (state) => {
      state.isNavbarOpened = !state.isNavbarOpened
    },
    setIsNavbarOpened: (state, { payload }: PayloadAction<AppActionPayloads['setIsNavbarOpened']>) => {
      state.isNavbarOpened = payload
    }
  },
});

export const { setAppOptions, toggleNavbar, setIsNavbarOpened } = appSlice.actions;

export default appSlice.reducer;
