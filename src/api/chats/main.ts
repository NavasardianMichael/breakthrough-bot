import { CHATS_LIST_INITIAL_STATE } from 'helpers/constants/store'
import { ChatsSlice } from 'store/chats/types'

export const getChatsList = async (): Promise<ChatsSlice['list']> => {
  // const { data } = await axiosInstance.get(`/chats`)
  // processChatsListResponse
  return CHATS_LIST_INITIAL_STATE
}