import { TEMP_MESSAGE } from 'helpers/constants/chat'
import { RootState } from '../main'

export const selectChatsList = (state: RootState) => state.chats.list

export const selectCurrentChat = (state: RootState) => {
    return state.chats.list.byId[state.chats.currentChatId]
}

export const selectIsAppendedMessageConfirmed = (state: RootState) => {
    const messages = state.chats.list.byId[state.chats.currentChatId].messages
    return state.chats.list.byId[state.chats.currentChatId].messages[messages.length - 1]?.id !== TEMP_MESSAGE.id
}

export const selectCurrentChatId = (state: RootState) => state.chats.currentChatId

export const selectIsCurrentChatPromptPending = (state: RootState) => state.chats.list.byId[state.chats.currentChatId].isPromptPending

export const selectErrorMessage = (state: RootState) => state.chats.errorMessage
