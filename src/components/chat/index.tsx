import { FC } from "react";
import styles from "./styles.module.css";
import MessagesList from './messages-list';
import MessageInputBox from './message-input-box';

const Chat: FC = () => {
  return (
    <div className={styles.chat}>
      <MessagesList />
      <MessageInputBox />
    </div>
  );
};

export default Chat;
