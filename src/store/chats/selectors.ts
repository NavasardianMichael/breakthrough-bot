import { RootState } from '../main'

export const selectChatsList = (state: RootState) => state.chats.list

export const selectCurrentChat = (state: RootState) => {
    const list = state.chats.list
    return list.byId[list.currentId]
}

export const selectCurrentChatId = (state: RootState) => state.chats.list.currentId

export const selectErrorMessage = (state: RootState) => state.chats.errorMessage
