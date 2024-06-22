import OpenAI from 'openai';
import { ChatsSlice, Message } from 'store/chats/types';
import { processMessageResponse } from './processors';
import { INITIAL_CHATS_LIST } from 'helpers/constants/chat';
import { sleep } from 'openai/core.mjs';

export const getChatsList = async (): Promise<ChatsSlice['list']> => {
  // const { data } = await axiosInstance.get(`/chats`)
  // processChatsListResponse
  return INITIAL_CHATS_LIST
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
  await sleep(2000)
  return processedMessage
}