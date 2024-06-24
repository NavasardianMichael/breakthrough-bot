import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INITIAL_CHATS_LIST } from 'helpers/constants/chat';
import { STATE_SLICE_NAMES } from 'helpers/constants/store';
import { getSliceActionGroup, } from 'helpers/utils/store';
import { ChatsActionPayloads, ChatsSlice } from './types';

const initialState: ChatsSlice = {
  list: INITIAL_CHATS_LIST,
  currentChatId: INITIAL_CHATS_LIST.allIds[0],
  pendingChatId: '',
  pendingMessageId: '',
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
    setCurrentChatId: (state, { payload }: PayloadAction<ChatsActionPayloads['setCurrentChatId']>) => {
      state.currentChatId = payload
    },
    setIsCurrentChatPromptPending: (state, { payload }: PayloadAction<ChatsActionPayloads['setIsCurrentChatPromptPending']>) => {
      state.list.byId[state.currentChatId].isPromptPending = payload
    },
    confirmAppendedMessage: (state, { payload }: PayloadAction<ChatsActionPayloads['confirmAppendedMessage']>) => {
      const messages = state.list.byId[state.currentChatId].messages
      state.list.byId[state.currentChatId].messages[messages.length - 1] = payload
    },
    appendMessageToCurrentChat: (state, { payload }: PayloadAction<ChatsActionPayloads['appendMessageToCurrentChat']>) => {
      state.list.byId[state.currentChatId].messages = [
        ...state.list.byId[state.currentChatId].messages,
        payload
      ]
    },
    addChat: (state, { payload: { id, messages, updatedDate, isPromptPending } }: PayloadAction<ChatsActionPayloads['addChat']>) => {
      if (!state.list.byId[id]) {
        state.list.byId[id] = {
          id,
          updatedDate,
          messages,
          isPromptPending
        };
        state.list.allIds.push(id)
      } else {
        state.list.byId[id].messages = [
          ...state.list.byId[id].messages,
          ...messages
        ];
      }
      state.currentChatId = id
    },
    setChatOptions: (state, { payload }: PayloadAction<ChatsActionPayloads['setChatOptions']>) => {
      state.list.byId[payload.id] = {
        ...state.list.byId[payload.id],
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Generic cases triggered for all thunks
    builder
      // .addMatcher(chatsActionTypeMatcher('/pending'), (state) => {
      // })
      .addMatcher(chatsActionTypeMatcher('/fulfilled'), (state) => {
        state.errorMessage = ''
      })
      .addMatcher(
        chatsActionTypeMatcher('/rejected'),
        (state, action: PayloadAction<Error>) => {
          state.pendingChatId = '';
          console.log({ action });

          state.errorMessage = action.payload.message ?? '';
        }
      );

    // For specific thunks
    // builder
    //   .addCase(saveMessageThunk.fulfilled, (state) => {
    //     state.pendingMessageId = ''
    //   })
  },
});

export const {
  setChatsList,
  setCurrentChatId,
  setIsCurrentChatPromptPending,
  appendMessageToCurrentChat,
  confirmAppendedMessage,
  setChatOptions,
  addChat
} = chatsSlice.actions;

export default chatsSlice.reducer;
