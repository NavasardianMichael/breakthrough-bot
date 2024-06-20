import { ChangeEventHandler, FC, useState } from "react";
import styles from "./styles.module.css";
import { Message } from "store/chats/types";
import SendMessageIcon from "assets/icons/arrow-circle-right.svg";
import BaseButton from 'components/shared/base-button';

const MessageInputBox: FC = () => {
  const [message, setMessage] = useState<Message["value"]>("");

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <form>
        <div className={styles.messagesInputBox}>
          <textarea
            placeholder='Message BreakthroughBOT'
            className={styles.messageInput}
            value={message}
            onChange={handleMessageChange}
            rows={1}
          />
          <BaseButton>
            <SendMessageIcon />
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default MessageInputBox;
