import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatsActionPayloads, ChatsSlice } from './types';
import { getSliceActionGroup, } from 'helpers/utils/store';
import { CHATS_LIST_INITIAL_STATE, STATE_SLICE_NAMES } from 'helpers/constants/store';

const initialState: ChatsSlice = {
  list: CHATS_LIST_INITIAL_STATE,
  pendingChatId: '',
  errorMessage: '',
};

const chatsActionTypeMatcher = getSliceActionGroup(STATE_SLICE_NAMES.chats);

export const chatsSlice = createSlice({
  name: STATE_SLICE_NAMES.chats,
  initialState,
  reducers: {
    setChatsList: (state, { payload }: PayloadAction<ChatsActionPayloads['setChatsList']>) => {
      return {
        ...state,
        list: payload,
      };
    },
    addChat: (state, { payload: { id, messages } }: PayloadAction<ChatsActionPayloads['applyMessagesToChat']>) => {
      if (!state.list.byId[id]) {
        state.list.byId[id] = {
          id,
          messages,
        };
        state.list.allIds.push(id)
      } else {
        state.list.byId[id].messages = [
          ...state.list.byId[id].messages,
          ...messages
        ];
      }
    },
    setChatOptions: (state, { payload }: PayloadAction<ChatsActionPayloads['setChatOptions']>) => {
      state.list.byId[payload.id] = {
        ...state.list.byId[payload.id],
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(chatsActionTypeMatcher('/pending'), (state) => {
        state.pendingChatId = '';
      })
      .addMatcher(chatsActionTypeMatcher('/fulfilled'), (state) => {
        state.pendingChatId = '';
      })
      .addMatcher(
        chatsActionTypeMatcher('/rejected'),
        (state, action: PayloadAction<Error>) => {
          state.pendingChatId = '';
          state.errorMessage = action.payload.message ?? '';
        }
      );
  },
});

export const { setChatsList, setChatOptions, addChat } = chatsSlice.actions;

export default chatsSlice.reducer;
