import { FC } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { selectErrorMessage } from "store/chats/selectors";
import BaseButton from "components/shared/base-button";
import styles from "./styles.module.css";

const ErrorNotification: FC = () => {
  const errorMessage = useAppSelector(selectErrorMessage);

  if (!errorMessage) return;

  return (
    <div className={styles.errorNotification}>
      <p className={styles.errorMessage}>{errorMessage}</p>
      <BaseButton>&#10006;</BaseButton>
    </div>
  );
};

export default ErrorNotification;
