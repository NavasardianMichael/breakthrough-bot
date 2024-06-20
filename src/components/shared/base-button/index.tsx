import { DetailedHTMLProps, FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";
import { combineClassNames } from 'helpers/utils/commons';

const BaseButton: FC<
  PropsWithChildren<
    DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, className, ...restProps }) => {
  return (
    <button {...restProps} className={combineClassNames(className, styles.baseButton)}>
      {children}
    </button>
  );
};

export default BaseButton;
