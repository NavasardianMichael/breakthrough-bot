import { AxiosError, isAxiosError } from 'axios'
import { createAppAsyncThunk } from 'helpers/utils/store'
import { getChatsList } from 'api/chats/main'
import { appendMessageToCurrentChat, setChatsList } from './slice'
import { ChatsSlice, Message } from './types'
import { ROLES } from 'helpers/constants/chat'

export const getChatsListThunk = createAppAsyncThunk<ChatsSlice['list'], void>(
  'chats/getChatsList',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const chatsList = await getChatsList()

      dispatch(setChatsList(chatsList))

      return chatsList
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const appendMessageToCurrentChatThunk = createAppAsyncThunk<Message, Message>(
  'chats/appendMessageToCurrentChatThunk',
  async (message, { rejectWithValue, dispatch }) => {
    try {
      if(message.role === ROLES.system) {
      }
      const chatsList = await getChatsList()
      dispatch(
        appendMessageToCurrentChat({
          id: Math.random().toFixed(5),
          role: ROLES.user,
          value: message,
        })
      );
      dispatch(setChatsList(chatsList))

      return chatsList
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)
