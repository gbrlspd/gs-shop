/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signOut, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebase/config';
import styles from './Header.module.scss';

/* [GSMOD] Application logo */
const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h2>
        <span>Generic</span>
        <b>Shop</b>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <NavLink to='/cart'>
      Cart
      <FaShoppingCart className='--ml' size={18} />
      <p>0</p>
    </NavLink>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.info(`Logged out successfully`, { theme: 'colored' });
        navigate('/login');
      })
      .catch((error) => {
        toast.error(`[${error.code}] ${error.message}`, { theme: 'colored' });
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName.split(' ')[0]);
        console.log(username);
      } else {
        setUsername('');
      }
    });
  }, [username]);

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}>
          <div
            className={showMenu ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}` : `${styles['nav-wrapper']}`}
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={28} onClick={hideMenu} />
            </li>
            <li>
              <NavLink to='/' className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={activeLink}>
                Contact
              </NavLink>
            </li>
          </ul>
          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to='/' onClick={logoutUser}>
                Logout
              </NavLink>
              <NavLink to='/login' className={activeLink}>
                Login
              </NavLink>
              <a href='#' className={styles.user}>
                <FaUser className='--mr' />
                {username}
              </a>
              <NavLink to='/register' className={activeLink}>
                Register
              </NavLink>
              <NavLink to='/orders' className={activeLink}>
                Orders
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>
        {/* Mobile only */}
        <div className={styles['menu-icon']}>
          {cart}
          <FaBars size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
