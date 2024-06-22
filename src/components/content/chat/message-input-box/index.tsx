import SendMessageIcon from "assets/icons/arrow-circle-right.svg";
import BaseButton from "components/shared/base-button";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  useMemo,
  useState,
} from "react";
import { sendUserMessageThunk } from "store/chats/thunk";
import { Message } from "store/chats/types";
import styles from "./styles.module.css";
import { useAppSelector } from "hooks/useAppSelector";
import {
  selectIsAppendedMessageConfirmed,
  selectIsCurrentChatPromptPending,
} from "store/chats/selectors";

const MessageInputBox: FC = () => {
  const dispatch = useAppDispatch();
  const isAppendedMessageConfirmed = useAppSelector(
    selectIsAppendedMessageConfirmed
  );
  const isCurrentChatPromptPending = useAppSelector(
    selectIsCurrentChatPromptPending
  );

  const [message, setMessage] = useState<Message["value"]>("");

  const isSendMessageDisabled = useMemo(() => {
    console.log({
      message,
      isAppendedMessageConfirmed,
      isCurrentChatPromptPending,
    });

    return (
      !message || !isAppendedMessageConfirmed || isCurrentChatPromptPending
    );
  }, [isAppendedMessageConfirmed, isCurrentChatPromptPending, message]);

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    dispatch(sendUserMessageThunk(message));
    setMessage("");
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (!e.ctrlKey || e.key !== "Enter" || isSendMessageDisabled) return;
    sendMessage();
  };

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
          <BaseButton disabled={isSendMessageDisabled}>
            <SendMessageIcon />
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default MessageInputBox;
