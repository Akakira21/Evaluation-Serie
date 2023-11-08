import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import MobileMenu from "./components/MobileMenu";
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function Header( {user, setUser} ) {


  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

function deconnexion() {
        // setUser(-1);
        // TypeError: setUser is not a function
        navigate("/");
    }

  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
      <NavLink to="/" className={`mr10 tdn`}>
          <img src={logo} alt="logo du blog" />
        </NavLink>
      </div>

        {user === -1 ? (
          <>

            <ul className={`${styles.desktopHeader}`}>
              <NavLink end to="/login" className={`mr10 tdn `}>
                <button className="mr10 btn btn-primary-reverse">
                  <i className="fas fa-right-to-bracket mr10"></i>
                  <span>Login</span>
                </button>
              </NavLink>

              <NavLink end to="/register" className={`mr10 tdn `}>
                <button className="mr10 btn btn-primary-reverse">
                  <span>Register</span>
                </button>
              </NavLink>
            </ul>

          </>
        ):(
          <>
            {user === 1 ? (
              <>
              
                <NavLink end to="/profile" className={`mr10 tdn `}>
                  <button className="mr10 btn btn-primary-reverse">
                    <i className="fa-solid fa-user mr10"></i>
                    <span>Profile</span>
                  </button>
                </NavLink>

                <NavLink end to="/favorites" className={`mr10 tdn `}>
                  <button className="mr10 btn btn-primary-reverse">
                    <i className="fa-solid fa-heart mr10"></i>
                    <span>Favorites</span>
                  </button>
                </NavLink>

                <NavLink end to="/adminpanel" className={`mr10 tdn `}>
                  <button className="mr10 btn btn-primary-reverse">                    
                  <i className="fa-solid fa-lock mr10"></i>
                    <span>Admin Panel</span>
                  </button>
                </NavLink>

                <button className="mr10 btn btn-primary-reverse" onClick={() => deconnexion()}>                    
                  <i className="fa-solid fa-right-from-bracket mr10"></i>
                  <span>Déconnexion</span>
                </button>

              </>
            ):(
              <>
              
                <NavLink end to="/profile" className={`mr10 tdn `}>
                  <button className="mr10 btn btn-primary-reverse">
                    <i className="fa-solid fa-user mr10"></i>
                    <span>Profile</span>
                  </button>
                </NavLink>

                <NavLink end to="/favorites" className={`mr10 tdn `}>
                  <button className="mr10 btn btn-primary-reverse">
                    <i className="fa-solid fa-heart mr10"></i>
                    <span>Favorites</span>
                  </button>
                </NavLink>

                <button className="mr10 btn btn-primary-reverse" onClick={() => deconnexion()}>
                  <i className="fa-solid fa-right-from-bracket mr10"></i>
                  <span>Déconnexion</span>
                </button>

              </>
            )}

          </>
        )}


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
