import { FC } from "react";
import styles from "./styles.module.css";
import { useAppSelector } from "hooks/useAppSelector";
import { selectCurrentChat } from "store/chats/selectors";
import { combineClassNames, copyToClipboard } from "helpers/utils/commons";
import { ROLES, TEMP_MESSAGE } from "helpers/constants/chat";
import CopyIcon from "assets/icons/copy.svg";
import LikeIcon from "assets/icons/like.svg";
import DislikeIcon from "assets/icons/dislike.svg";
import BaseButton from "components/shared/base-button";

const MessagesList: FC = () => {
  const currentChat = useAppSelector(selectCurrentChat);

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
    <div className={styles.container}>
      <div className={styles.messagesList}>
        {currentChat.messages.map((message) => {
          return (
            <div
              key={message.id}
              className={combineClassNames(
                styles.messageBlock,
                styles[message.role]
              )}
            >
              <p className={styles.text}>{message.value}</p>
              {message.role === ROLES.system && (
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
      </div>
    </div>
  );
};

export default MessagesList;
