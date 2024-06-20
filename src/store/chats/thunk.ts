import { AxiosError, isAxiosError } from 'axios'
import { createAppAsyncThunk } from 'helpers/utils/store'
import { getChatsList } from 'api/chats/main'
import { setChatsList } from './slice'
import { ChatsSlice } from './types'

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
