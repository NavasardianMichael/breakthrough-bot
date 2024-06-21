import { Chat, ChatsSlice, Message } from 'store/chats/types'
import { ChatResponse, GetChatsResponse, MessageResponse } from './types'


export const processChatsListResponse = (response: GetChatsResponse): ChatsSlice['list'] => {
  return response.reduce(
    (acc, chat, index, arr) => {
      const processedChat = processChatResponse(chat)
      acc.byId[chat.id] = processedChat
      acc.allIds.push(processedChat.id)
      if (index === arr.length - 1) acc.currentId = chat.id
      return acc
    },
    {
      byId: {},
      allIds: [],
      currentId: ''
    } as ChatsSlice['list']
  )
}

export const processChatResponse = (chatResponse: ChatResponse): Chat => {
  return chatResponse
}

export const processMessageResponse = (messageResponse: MessageResponse): Message => {
  return messageResponse
}