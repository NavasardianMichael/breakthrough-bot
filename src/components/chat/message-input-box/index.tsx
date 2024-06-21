import { ChangeEventHandler, FC, FormEventHandler, KeyboardEventHandler, useState } from "react";
import styles from "./styles.module.css";
import { Message } from "store/chats/types";
import SendMessageIcon from "assets/icons/arrow-circle-right.svg";
import BaseButton from "components/shared/base-button";
import { useAppDispatch } from "hooks/useAppDispatch";
import { appendMessageToCurrentChat } from "store/chats/slice";
import { ROLES } from "helpers/constants/chat";

const MessageInputBox: FC = () => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<Message["value"]>("");

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendMessage()
  };

  const sendMessage = () => {
    dispatch(
      appendMessageToCurrentChat({
        id: Math.random().toFixed(5),
        role: ROLES.user,
        value: message,
      })
    );
    setMessage("");
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if(!e.ctrlKey || e.key !== "Enter" || !message) return;
    sendMessage()
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.messagesInputBox}>
          <textarea
            placeholder="Message BreakthroughBOT"
            className={styles.messageInput}
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <BaseButton disabled={!message}>
            <SendMessageIcon />
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default MessageInputBox;
