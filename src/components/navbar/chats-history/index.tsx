import { FC } from "react";
import styles from "./styles.module.css";
import { useAppSelector } from "hooks/useAppSelector";
import { selectChatsList } from "store/chats/selectors";
import { categorizeDate } from 'helpers/utils/commons';
import BaseButton from 'components/shared/base-button';

const ChatsHistory: FC = () => {
  const chatsList = useAppSelector(selectChatsList);

  return (
    <div className={styles.chatsHistory}>
      {chatsList.allIds.map((chatId) => {
        const { id, updatedDate, messages } = chatsList.byId[chatId];
        return (
          <BaseButton key={id} className={styles.chat}>
            <p className={styles.category}>{categorizeDate(updatedDate)}</p>
            <p className={styles.message}>{messages.length ? messages[messages.length - 1].value : 'What are you looking to accomplish? Ask me a question and I will do my best to provide a meaningful answer.'}</p>
          </BaseButton>
        );
      })}
    </div>
  );
};

export default ChatsHistory;
