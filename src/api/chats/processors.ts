import { Chat, ChatsSlice, Message } from 'store/chats/types'
import { ChatResponse, GetChatsResponse, MessageResponse } from './types'
import { generateRandomId } from 'helpers/utils/commons'


export const processChatsListResponse = (response: GetChatsResponse): ChatsSlice['list'] => {
  return response.reduce(
    (acc, chat) => {
      const processedChat = processChatResponse(chat)
      acc.byId[chat.id] = processedChat
      acc.allIds.push(processedChat.id)
      return acc
    },
    {
      byId: {},
      allIds: [],
      currentChatId: ''
    } as ChatsSlice['list']
  )
}

export const processChatResponse = (chatResponse: ChatResponse): Chat => {
  return chatResponse
}

export const processMessageResponse = (messageResponse: MessageResponse): Message => {
  return {
    ...messageResponse,
    id: generateRandomId('message')
  }
}