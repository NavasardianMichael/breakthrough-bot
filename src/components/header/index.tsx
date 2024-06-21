import { FC, MouseEventHandler, useCallback } from "react";
import ChatHandlers from "./chat-handlers";
import Logo from "assets/images/logo.svg";
import styles from "./styles.module.css";
import { useAppDispatch } from "hooks/useAppDispatch";
import { addChat } from "store/chats/slice";
import BaseButton from "components/shared/base-button";
import CreateNewChatIcon from "assets/icons/edit.svg";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const createNewChat: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      dispatch(
        addChat({
          id: "chat-temp-id",
          updatedDate: new Date().toString(),
          messages: [],
        })
      );
    }, [dispatch]);

  return (
    <div className={styles.header}>
      <ChatHandlers createNewChat={createNewChat} />
      <h1 className={styles.primaryText}>
        <span className={styles.firstPart}>Breakthrough</span>
        <span className={styles.secondPart}>BOT</span>
      </h1>
      <BaseButton
        className={styles.createNewChatMobileButton}
        onClick={createNewChat}
      >
        <CreateNewChatIcon />
      </BaseButton>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
    </div>
  );
};

export default Header;
