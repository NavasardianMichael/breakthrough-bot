import { AxiosError, isAxiosError } from 'axios'
import { createAppAsyncThunk } from 'helpers/utils/store'
import { getChatsList, saveMessage } from 'api/chats/main'
import { appendMessageToChat, confirmAppendedMessage, setChatsList, setIsChatPromptPending } from './slice'
import { Chat, ChatsSlice, Message } from './types'
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

export const sendUserMessageThunk = createAppAsyncThunk<void, { chatId: Chat['id'], messageText: Message['value'] }>(
  'chats/sendUserMessageThunk',
  async ({ chatId, messageText }, { rejectWithValue, dispatch }) => {
    try {
      // User Message Flow
      const tempUserMessage: Message = {
        id: TEMP_MESSAGE.id,
        role: ROLES.user,
        value: messageText
      }
      const confirmedUserMessage = await dispatch(saveMessageThunk({
        chatId,
        message: tempUserMessage
      })).unwrap()
      // Setting the "isPromptPending" flag of the corresponding chat so that to show the user that AI response is pending
      dispatch(setIsChatPromptPending({
        id: chatId,
        isPromptPending: true
      }))

      // AI Response Flow
      // const aiMessage = await promptToOpenAI(confirmedUserMessage.value)
      console.log({confirmedUserMessage});
      
      const aiMessage = TEMP_MESSAGE.value
      const tempAIMessage = {
        id: TEMP_MESSAGE.id,
        role: ROLES.system,
        value: aiMessage
      }
      dispatch(setIsChatPromptPending({
        id: chatId,
        isPromptPending: false
      }))
      dispatch(saveMessageThunk({
        chatId,
        message: tempAIMessage
      }))

    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  }
)

export const saveMessageThunk = createAppAsyncThunk<Message, { chatId: Chat['id'], message: Message }>(
  'chats/saveMessageThunk',
  async ({ chatId, message }, { rejectWithValue, dispatch }) => {
    try {
      // 1. Dispatching a temporary (not confirmed from back end side) message to show in chat (in disabled status)
      dispatch(appendMessageToChat({ chatId, message }))
      // 2. Saving the message on back end side
      const confirmedMessage = await saveMessage(message)
      // 3. Replacing the temporary message with confirmed message received from back end side
      dispatch(confirmAppendedMessage({ chatId, message: confirmedMessage }))
      return confirmedMessage
    } catch (e) {
      const error = e as Error | AxiosError
      const processedError = isAxiosError(error) ? error?.response?.data : error
      return rejectWithValue(processedError)
    }
  },
)
