import { useAppDispatch } from "hooks/useAppDispatch";
import OpenNavBarIcon from "assets/icons/arrow-right-to-bracket.svg";
import CreateNewChatIcon from "assets/icons/edit.svg";
import styles from "./styles.module.css";
import BaseButton from "components/shared/base-button";
import { setIsNavbarOpened } from "store/app/slice";
import { FC, MouseEventHandler } from "react";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const handleCloseNavbar: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setIsNavbarOpened(false));
  };

  return (
    <div className={styles.header}>
      <BaseButton
        className={styles.reversedIconButton}
        onClick={handleCloseNavbar}
      >
        <OpenNavBarIcon />
      </BaseButton>
      <BaseButton>
        <CreateNewChatIcon />
      </BaseButton>
    </div>
  );
};

export default Header;
