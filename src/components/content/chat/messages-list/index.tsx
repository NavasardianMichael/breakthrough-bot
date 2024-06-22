import { FC, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { useAppSelector } from "hooks/useAppSelector";
import {
  selectCurrentChat,
  selectIsCurrentChatPromptPending,
} from "store/chats/selectors";
import { combineClassNames, copyToClipboard } from "helpers/utils/commons";
import { ROLES, TEMP_MESSAGE } from "helpers/constants/chat";
import CopyIcon from "assets/icons/copy.svg";
import LikeIcon from "assets/icons/like.svg";
import DislikeIcon from "assets/icons/dislike.svg";
import BaseButton from "components/shared/base-button";
import TypingHint from "../typing-hint";

const MessagesList: FC = () => {
  const currentChat = useAppSelector(selectCurrentChat);
  const isCurrentChatPromptPending = useAppSelector(
    selectIsCurrentChatPromptPending
  );

  const messagesListContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messagesListContainer.current) return;
    messagesListContainer.current.scrollTo(
      0,
      messagesListContainer.current.scrollHeight
    );
  }, [currentChat.messages]);

  if (!currentChat.messages.length) {
    return (
      <p
        className={combineClassNames(
          styles.container,
          styles.emptyConversationHint
        )}
      >
        {TEMP_MESSAGE.value}
      </p>
    );
  }

  return (
    <div className={styles.container} ref={messagesListContainer}>
      <div className={styles.messagesList}>
        {currentChat.messages.map((message) => {
          const isTempMessage = message.id === TEMP_MESSAGE.id;
          return (
            <div
              key={message.id}
              className={combineClassNames(
                styles.messageBlock,
                styles[message.role],
                isTempMessage && styles.pending
              )}
            >
              <p className={styles.text}>{message.value}</p>
              {!isTempMessage && message.role === ROLES.system && (
                <div className={styles.actions}>
                  <BaseButton onClick={() => copyToClipboard(message.value)}>
                    <CopyIcon />
                  </BaseButton>
                  <BaseButton className={styles.likeBtn}>
                    <LikeIcon />
                  </BaseButton>
                  <BaseButton>
                    <DislikeIcon />
                  </BaseButton>
                </div>
              )}
            </div>
          );
        })}
        {isCurrentChatPromptPending && <TypingHint key="typing-hint" />}
      </div>
    </div>
  );
};

export default MessagesList;
