import { FC } from "react";
import styles from "./styles.module.css";
import Header from "./header";
import Chat from "./chat";

const Content: FC = () => {
  return (
    <div className={styles.content}>
      <Header />
      <Chat />
    </div>
  );
};

export default Content;
