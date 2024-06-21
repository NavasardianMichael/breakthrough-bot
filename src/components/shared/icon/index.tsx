import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

const Icon: FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className={styles.icon}>
      {children}
    </span>
  );
};

export default Icon;
