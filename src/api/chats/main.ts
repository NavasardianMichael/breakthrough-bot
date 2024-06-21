import { CHATS_LIST_INITIAL_STATE } from 'helpers/constants/store';
import OpenAI from 'openai';
import { ChatsSlice, Message } from 'store/chats/types';
import { processMessageResponse } from './processors';

export const getChatsList = async (): Promise<ChatsSlice['list']> => {
  // const { data } = await axiosInstance.get(`/chats`)
  // processChatsListResponse
  return CHATS_LIST_INITIAL_STATE
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const promptToOpenAI = async (message: Message['value']): Promise<Message['value']> => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
    model: "gpt-4o",
  });
  console.log({ completion });

  return completion.choices[0].message.content as Message['value']
}

export const saveMessage = async (message: Message): Promise<Message> => {
  // const { data } = await axiosInstance.post<MessageResponse>(`/chats`)
  const processedMessage = processMessageResponse(message)
  return processedMessage
}