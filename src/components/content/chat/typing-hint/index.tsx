import TypingSvgAnimation from "assets/svgAnimations/typing.svg";
import { FC } from "react";
import styles from "./styles.module.css";

const TypingHint: FC = () => {
  return (
    <div className={styles.typingHint}>
      <TypingSvgAnimation />
    </div>
  );
};

export default TypingHint;
