import { Message } from "store/chats/types"

export const ROLES = {
    system: 'system',
    user: 'user',
} as const

export const TEMP_MESSAGE: Message = {
    id: 'message-temp-id',
    role: ROLES.system,
    value: 'What are you looking to accomplish? Ask me a question and I will do my best to provide a meaningful answer.'
}