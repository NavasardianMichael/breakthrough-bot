import { FC } from "react";
import styles from "./styles.module.css";
import { useAppSelector } from "hooks/useAppSelector";
import { selectChatsList } from "store/chats/selectors";

const ChatsHistory: FC = () => {
  const chatsList = useAppSelector(selectChatsList);

  return (
    <div className={styles.chatsHistory}>
      {chatsList.allIds.map((chatId) => {
        const { id, messages } = chatsList.byId[chatId];
        return (
          <div key={id} className={styles.chat}>
            <p>{messages.length}</p>
            {messages.length && <p>{messages[messages.length - 1].value}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default ChatsHistory;
