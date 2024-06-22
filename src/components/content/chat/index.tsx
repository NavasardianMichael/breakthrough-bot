import { FC } from "react";
import MessageInputBox from "./message-input-box";
import MessagesList from "./messages-list";
import styles from "./styles.module.css";

const Chat: FC = () => {
  return (
    <div className={styles.chat}>
      <MessagesList />
      <MessageInputBox />
    </div>
  );
};

export default Chat;
