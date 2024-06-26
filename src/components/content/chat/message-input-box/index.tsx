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
  selectCurrentChatId,
  selectIsAppendedMessageConfirmed,
  selectIsCurrentChatPromptPending,
} from "store/chats/selectors";

const MessageInputBox: FC = () => {
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector(selectCurrentChatId);
  const isAppendedMessageConfirmed = useAppSelector(
    selectIsAppendedMessageConfirmed
  );
  const isCurrentChatPromptPending = useAppSelector(
    selectIsCurrentChatPromptPending
  );

  const [messageText, setMessageText] = useState<Message["value"]>("");

  const isSendMessageDisabled = useMemo(() => {
    return (
      !messageText || !isAppendedMessageConfirmed || isCurrentChatPromptPending
    );
  }, [isAppendedMessageConfirmed, isCurrentChatPromptPending, messageText]);

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessageText(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    dispatch(
      sendUserMessageThunk({
        chatId: currentChatId,
        messageText: messageText.trim(),
      })
    );
    setMessageText("");
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !isSendMessageDisabled) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.messagesInputBox}>
          <textarea
            placeholder="Message BreakthroughBOT"
            className={styles.messageInput}
            value={messageText}
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
