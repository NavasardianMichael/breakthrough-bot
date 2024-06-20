import { combineClassNames } from "helpers/utils/commons";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { FC, useEffect, useRef } from "react";
import { selectAppOptions } from "store/app/selectors";
import { setIsNavbarOpened } from "store/app/slice";
import styles from "./styles.module.css";
import Header from "./header";
import ChatsHistory from "./chats-history";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const { isNavbarOpened } = useAppSelector(selectAppOptions);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeNavbarOnOutsideClick: (
      this: Document,
      ev: MouseEvent
    ) => void = (e) => {
      if (!navbarRef?.current?.contains?.(e.target as HTMLElement)) {
        dispatch(setIsNavbarOpened(false));
      }
    };

    document.addEventListener("click", closeNavbarOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeNavbarOnOutsideClick);
    };
  }, [dispatch]);

  return (
    <nav
      className={combineClassNames(
        styles.navbar,
        !isNavbarOpened && styles.closed
      )}
      ref={navbarRef}
    >
      <Header />
      <ChatsHistory />
    </nav>
  );
};

export default Navbar;
