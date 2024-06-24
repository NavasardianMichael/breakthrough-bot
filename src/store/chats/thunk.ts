import { AxiosError, isAxiosError } from 'axios'
import { createAppAsyncThunk } from 'helpers/utils/store'
import { getChatsList, promptToOpenAI, saveMessage } from 'api/chats/main'
import { appendMessageToCurrentChat, confirmAppendedMessage, setChatsList, setIsCurrentChatPromptPending } from './slice'
import { ChatsSlice, Message } from './types'
import { ROLES, TEMP_MESSAGE } from 'helpers/constants/chat'
// import { sleep } from 'openai/core.mjs'

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
      const tempUserMessage: Message = {
        id: TEMP_MESSAGE.id,
        role: ROLES.user,
        value: messageText
      }
      dispatch(appendMessageToCurrentChat(tempUserMessage))
      const confirmedUserMessage = await saveMessage(tempUserMessage)
      dispatch(confirmAppendedMessage(confirmedUserMessage))

      dispatch(setIsCurrentChatPromptPending(true))

      const aiMessage = await promptToOpenAI(confirmedUserMessage.value)
      // const aiMessage = TEMP_MESSAGE.value
      // await sleep(2000)
      const tempAIMessage = {
        id: TEMP_MESSAGE.id,
        role: ROLES.system,
        value: aiMessage
      }
      dispatch(setIsCurrentChatPromptPending(false))
      dispatch(appendMessageToCurrentChat(tempAIMessage))
      const confirmedAIMessage = await saveMessage(tempAIMessage)
      dispatch(confirmAppendedMessage(confirmedAIMessage))


    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const saveMessageThunk = createAppAsyncThunk<Message, Message>(
  'chats/saveMessageThunk',
  async (message, { rejectWithValue, dispatch }) => {
    try {
      dispatch(appendMessageToCurrentChat(message))
      return await saveMessage(message)
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  },
)
