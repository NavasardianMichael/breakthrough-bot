import { selectChatsList } from "store/chats/selectors";
import { useAppSelector } from "./useAppSelector";

import { useMemo } from "react";
import { categorizeDate } from "helpers/utils/chat";
import { Chat } from "store/chats/types";
import { TEMP_MESSAGE } from "helpers/constants/chat";

export const useDateCategorizedChats = () => {
    const chatsList = useAppSelector(selectChatsList);
    const categorizedChatsByDates = useMemo(() => {
        return chatsList.allIds.reduce((acc, chatId) => {
            const chat = chatsList.byId[chatId]
            const category = categorizeDate(chat.updatedDate)
            if (!acc[category]) acc[category] = [] as Chat[]
            acc[category].push({
                id: chat.id,
                updatedDate: chat.updatedDate,
                messages: [chat.messages[chat.messages.length - 1] ?? TEMP_MESSAGE]
            })
            return acc
        }, {} as Record<string, Chat[]>)
    }, [chatsList])

    return Object.entries(categorizedChatsByDates)
}