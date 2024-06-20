import OpenNavBarIcon from "assets/icons/arrow-right-to-bracket.svg";
import CreateNewChatIcon from "assets/icons/edit.svg";
import BaseButton from "components/shared/base-button";
import { combineClassNames } from "helpers/utils/commons";
import { useAppDispatch } from "hooks/useAppDispatch";
import { FC, MouseEventHandler } from "react";
import { setIsNavbarOpened } from "store/app/slice";
import styles from "./styles.module.css";
import { addChat } from "store/chats/slice";

const ChatHandlers: FC = () => {
  const dispatch = useAppDispatch();

  const openNavbar: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(setIsNavbarOpened(true));
  };

  const createNewChat: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      addChat({
        id: "chat-temp-id",
        updatedDate: new Date().toString(),
        messages: [],
      })
    );
  };

  return (
    <div className={styles.chatHandlers}>
      <BaseButton
        className={combineClassNames(styles.handler, styles.fillStroke)}
        onClick={openNavbar}
      >
        <OpenNavBarIcon />
      </BaseButton>
      <BaseButton className={styles.handler} onClick={createNewChat}>
        <CreateNewChatIcon />
      </BaseButton>
    </div>
  );
};

export default ChatHandlers;
