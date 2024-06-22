import { ROLES } from 'helpers/constants/chat'
import { Normalized, PartialButRequired } from 'helpers/types/commons'

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
  setCurrentChatId: Chat['id']
  appendMessageToCurrentChat: Message
  setChatOptions: PartialButRequired<Chat, 'id'>
  addChat: Chat
  setIsCurrentChatPromptPending: Chat['isPromptPending']
  setPendingMessageId: Message['id']
  confirmAppendedMessage: Message
}
