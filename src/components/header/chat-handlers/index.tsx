import OpenNavBarIcon from "assets/icons/arrow-right-to-bracket.svg";
import CreateNewChatIcon from "assets/icons/edit.svg";
import BaseButton from "components/shared/base-button";
import { combineClassNames } from "helpers/utils/commons";
import { useAppDispatch } from "hooks/useAppDispatch";
import { FC, MouseEventHandler } from "react";
import { setIsNavbarOpened } from "store/app/slice";
import styles from "./styles.module.css";

const ChatHandlers: FC = () => {
  const dispatch = useAppDispatch();

  const handleOpenNavbar: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(setIsNavbarOpened(true));
  };

  return (
    <div className={styles.chatHandlers}>
      <BaseButton
        className={combineClassNames(styles.handler, styles.fillStroke)}
        onClick={handleOpenNavbar}
      >
        <OpenNavBarIcon />
      </BaseButton>
      <BaseButton className={styles.handler}>
        <CreateNewChatIcon />
      </BaseButton>
    </div>
  );
};

export default ChatHandlers;
