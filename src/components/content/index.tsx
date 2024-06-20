import { FC } from "react";
import styles from "./styles.module.css";
import Header from 'components/header';
import Chat from 'components/chat';

const Content: FC = () => {
  return (
    <div className={styles.content}>
      <Header />
      <Chat />
    </div>
  );
};

export default Content;
