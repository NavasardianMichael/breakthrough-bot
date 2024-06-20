import { FC } from "react";
import styles from "./styles.module.css";
import { useAppSelector } from 'hooks/useAppSelector';
import { selectCurrentChat } from 'store/chats/selectors';
import { combineClassNames } from 'helpers/utils/commons';

const MessagesList: FC = () => {
  const currentChat = useAppSelector(selectCurrentChat)

  if(!currentChat) {
    return (
      <p className={combineClassNames(styles.container, styles.emptyConversationHint)}>
        What are you looking to accomplish? Ask me a question and I will do my best to provide a meaningful answer.
      </p>
    ) 
  }

  return (
    <div className={styles.container}>
      <div className={styles.messagesList}>
        {
          currentChat.messages.map(message => {
            return (
              <p key={message.id} className={combineClassNames(styles.message, styles[message.role])}>
                {message.value}
              </p>
            )
          })
        }
      </div>
    </div>
  );
};

export default MessagesList;
