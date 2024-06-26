import OpenNavBarIcon from "assets/icons/arrow-right-to-bracket.svg";
import CreateNewChatIcon from "assets/icons/edit.svg";
import BaseButton from "components/shared/base-button";
import { useAppDispatch } from "hooks/useAppDispatch";
import { FC, MouseEventHandler } from "react";
import { setIsNavbarOpened } from "store/app/slice";
import { addChat } from "store/chats/slice";
import styles from "./styles.module.css";
import { generateRandomId } from "helpers/utils/commons";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const handleCloseNavbar: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setIsNavbarOpened(false));
  };

  const createNewChat: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      addChat({
        id: generateRandomId("chat"),
        updatedDate: new Date().toString(),
        messages: [],
        isPromptPending: false,
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
