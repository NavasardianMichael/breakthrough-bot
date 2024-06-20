import { FC } from "react";
import styles from "./styles.module.css";
import ChatHandlers from './chat-handlers';
import Logo from "assets/images/logo.svg";

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <ChatHandlers />
      <h1 className={styles.primaryText}>
        <span className={styles.firstPart}>Breakthrough</span>
        <span className={styles.secondPart}>BOT</span>
      </h1>
      <Logo />
    </div>
  );
};

export default Header;
