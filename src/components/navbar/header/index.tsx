import { useAppDispatch } from "hooks/useAppDispatch";
import OpenNavBarIcon from "assets/icons/arrow-right-to-bracket.svg";
import CreateNewChatIcon from "assets/icons/edit.svg";
import styles from "./styles.module.css";
import BaseButton from "components/shared/base-button";
import { setIsNavbarOpened } from "store/app/slice";
import { FC, MouseEventHandler } from "react";
import { addChat } from "store/chats/slice";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const handleCloseNavbar: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setIsNavbarOpened(false));
  };

  const createNewChat: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      addChat({
        id: `chat-temp-id-${Math.round(Math.random() * 100_000)}`,
        updatedDate: new Date().toString(),
        messages: [],
      })
    );
  };

  return (
    <div className={styles.header}>
      <BaseButton
        className={styles.reversedIconButton}
        onClick={handleCloseNavbar}
      >
        <OpenNavBarIcon />
      </BaseButton>
      <BaseButton onClick={createNewChat}>
        <CreateNewChatIcon />
      </BaseButton>
    </div>
  );
};

export default Header;
