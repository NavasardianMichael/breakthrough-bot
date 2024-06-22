import OpenNavBarIcon from "assets/icons/arrow-right-to-bracket.svg";
import CreateNewChatIcon from "assets/icons/edit.svg";
import BaseButton from "components/shared/base-button";
import { combineClassNames } from "helpers/utils/commons";
import { useAppDispatch } from "hooks/useAppDispatch";
import { FC, MouseEventHandler } from "react";
import { setIsNavbarOpened } from "store/app/slice";
import styles from "./styles.module.css";

type Props = {
  createNewChat: MouseEventHandler<HTMLButtonElement>;
};

const ChatHandlers: FC<Props> = ({ createNewChat }) => {
  const dispatch = useAppDispatch();

  const openNavbar: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(setIsNavbarOpened(true));
  };

  return (
    <div className={styles.chatHandlers}>
      <BaseButton className={styles.handler} onClick={openNavbar}>
          <OpenNavBarIcon />
      </BaseButton>
      <BaseButton
        className={combineClassNames(
          styles.handler,
          styles.createNewChatButton
        )}
        onClick={createNewChat}
      >
        <CreateNewChatIcon />
      </BaseButton>
    </div>
  );
};

export default ChatHandlers;
