import { Chat, ChatsSlice, Message } from "store/chats/types"

export const ROLES = {
    system: 'system',
    user: 'user',
} as const

export const TEMP_MESSAGE: Message = {
    id: 'message-temp-id',
    role: ROLES.system,
    value: 'What are you looking to accomplish? Ask me a question and I will do my best to provide a meaningful answer.'
}

export const INITIAL_CHAT: Chat = {
    id: 'temp-id-1',
    updatedDate: '2024-06-23',
    isPromptPending: false,
    messages: [
        {
            id: 'temp-message-id-1',
            role: ROLES.user,
            value: 'Give me a random color.'
        },
        {
            id: 'temp-message-id-2',
            role: ROLES.system,
            value: 'Yes of course, here are they: ...'
        },
    ]
}

export const INITIAL_CHATS_LIST: ChatsSlice['list'] = {
    byId: {
        [INITIAL_CHAT.id]: INITIAL_CHAT
    },
    allIds: [INITIAL_CHAT.id],
}