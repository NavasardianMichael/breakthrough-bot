import BaseButton from "components/shared/base-button";
import { useDateCategorizedChats } from "hooks/useDateCategorizedChats";
import { FC, MouseEventHandler, useCallback } from "react";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { setCurrentChatId } from "store/chats/slice";
import { getIsMobileWidth } from "helpers/utils/app";
import { setIsNavbarOpened } from "store/app/slice";
import { combineClassNames } from "helpers/utils/commons";
import { useAppSelector } from "hooks/useAppSelector";
import { selectCurrentChatId } from "store/chats/selectors";

const ChatsHistory: FC = () => {
  const dispatch = useDispatch();
  const categorizedChats = useDateCategorizedChats();
  const currentChatId = useAppSelector(selectCurrentChatId);

  const handleChatClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name: chatId } = e.currentTarget;
      dispatch(setCurrentChatId(chatId));
      if (getIsMobileWidth()) dispatch(setIsNavbarOpened(false));
    },
    [dispatch]
  );

  return (
    <div className={styles.chatsHistory}>
      {categorizedChats.map((category) => {
        const [name, messages] = category;
        return (
          <div key={name} className={styles.category}>
            <p className={styles.category}>{name}</p>
            <div className={styles.chats}>
              {messages.map((message) => {
                const { id, messages } = message;
                return (
                  <BaseButton
                    key={id}
                    className={combineClassNames(
                      styles.chat,
                      id === currentChatId && styles.active
                    )}
                    onClick={handleChatClick}
                    name={id}
                  >
                    <p className={styles.message}>
                      {messages[messages.length - 1].value}
                    </p>
                  </BaseButton>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatsHistory;
