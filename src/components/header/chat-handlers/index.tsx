import { FC, MouseEventHandler } from "react";
import styles from "./styles.module.css";
import OpenNavBarIcon from "assets/icons/arrow-right-to-bracket.svg";
import CreateNewChatIcon from "assets/icons/edit.svg";
import BaseButton from 'components/shared/base-button';
import { combineClassNames } from 'helpers/utils/commons';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { toggleNavbar } from 'store/app/slice';

const ChatHandlers: FC = () => {
  const dispatch = useAppDispatch()

  const handleNavbarToggle: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(toggleNavbar())
  }

  return (
    <div className={styles.chatHandlers}>
      <BaseButton className={combineClassNames(styles.handler, styles.fillStroke)} onClick={handleNavbarToggle}>
        <OpenNavBarIcon />
      </BaseButton>
      <BaseButton className={styles.handler}>
        <CreateNewChatIcon />
      </BaseButton>
    </div>
  );
};

export default ChatHandlers;
