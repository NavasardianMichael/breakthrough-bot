import { FC } from "react";
import styles from "./styles.module.css";
import { useAppSelector } from 'hooks/useAppSelector';
import { selectAppOptions } from 'store/app/selectors';
import { combineClassNames } from 'helpers/utils/commons';

const Navbar: FC = () => {
  const { isNavbarOpened } = useAppSelector(selectAppOptions)
  
  return (
    <nav className={combineClassNames(styles.navbar, !isNavbarOpened && styles.closed )}>
      Navbar
    </nav>
  );
};

export default Navbar;
