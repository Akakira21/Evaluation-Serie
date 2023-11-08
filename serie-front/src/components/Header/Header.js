import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import MobileMenu from "./components/MobileMenu";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <img src={logo} alt="logo" />
      </div>
      <ul className={`${styles.desktopHeader}`}>
        <button className="mr10 btn btn-primary">
          <i className="fas fa-star mr10"></i>
          <span>Favorites</span>
        </button>
        <button className="mr10 btn btn-primary-reverse">
          <i className="fas fa-right-to-bracket mr10"></i>
          <span>Login</span>
        </button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fas fa-bars mr10 ${styles.mobileHeader}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className={`calc`}></div>
          <MobileMenu />
        </>
      )}
    </header>
  );
}
