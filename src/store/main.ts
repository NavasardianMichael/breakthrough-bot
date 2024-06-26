import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app/slice'
import chatsReducer from './chats/slice'
import { STATE_SLICE_NAMES } from 'helpers/constants/store'

export const store = configureStore({
  reducer: {
    [STATE_SLICE_NAMES.app]: appReducer,
    [STATE_SLICE_NAMES.chats]: chatsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
