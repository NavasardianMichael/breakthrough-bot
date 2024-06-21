import { AxiosError, isAxiosError } from 'axios'
import { createAppAsyncThunk } from 'helpers/utils/store'
import { getChatsList, promptToOpenAI, saveMessage } from 'api/chats/main'
import { appendMessageToCurrentChat, setChatsList } from './slice'
import { ChatsSlice, Message } from './types'
import { ROLES, TEMP_MESSAGE } from 'helpers/constants/chat'

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

export const sendUserMessageThunk = createAppAsyncThunk<void, Message['value']>(
  'chats/sendUserMessageThunk',
  async (messageText, { rejectWithValue, dispatch }) => {
    try {
      const userMessage = await saveMessage({
        id: TEMP_MESSAGE.id,
        role: ROLES.user,
        value: messageText
      })
      dispatch(appendMessageToCurrentChat(userMessage))

      const aiMessage = await promptToOpenAI(userMessage.value)
      const savedAIMessage = await saveMessage({
        id: TEMP_MESSAGE.id,
        role: ROLES.system,
        value: aiMessage
      })
      dispatch(appendMessageToCurrentChat(savedAIMessage))

    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)
