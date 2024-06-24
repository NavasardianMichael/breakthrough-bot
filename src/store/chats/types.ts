import { ROLES } from 'helpers/constants/chat'
import { Normalized } from 'helpers/types/commons'

export type ChatsSlice = {
  list: Normalized<Chat>
  currentChatId: Chat['id']
  pendingChatId: Chat['id']
  pendingMessageId: Message['id']
  errorMessage: Error['message']
}

export type Chat = {
  id: string
  updatedDate: string
  messages: Message[]
  isPromptPending: boolean
}

export type Message = {
  id: string
  value: string
  role: typeof ROLES[keyof typeof ROLES]
}

export type Role = (typeof ROLES)[keyof typeof ROLES]

export type ChatsActionPayloads = {
  setChatsList: ChatsSlice['list']
  addChat: Chat
  setCurrentChatId: Chat['id']
  setIsChatPromptPending: Pick<Chat, 'id' | 'isPromptPending'>
  setPendingMessageId: Message['id']
  appendMessageToChat: { chatId: Chat['id'], message: Message }
  confirmAppendedMessage: { chatId: Chat['id'], message: Message }
}
