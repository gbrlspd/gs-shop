/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../redux/features/authSlice';
import { auth } from '../../firebase/config';
import styles from './Header.module.scss';
import { ShowOnLogged, HideOnLogged, ShowOnAdminLink } from '../Display/Display';

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
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(REMOVE_ACTIVE_USER());
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
        if (user.displayName === null) {
          setUsername(user.email.split('@')[0]);
        } else {
          setUsername(user.displayName.split(' ')[0]);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            username: user.displayName ? user.displayName.split(' ')[0] : user.email.split('@')[0],
            userID: user.uid,
          })
        );
      } else {
        setUsername('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch]);

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}>
          <div
            className={showMenu ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}` : `${styles['nav-wrapper']}`}
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu} className='--flex-center'>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={28} onClick={hideMenu} />
            </li>
            <ShowOnAdminLink>
              <li>
                <Link to='/admin/home'>
                  <button className='--btn --btn-primary'>
                    <FaLock className='--mr' />
                    Admin
                  </button>
                </Link>
              </li>
            </ShowOnAdminLink>
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
              <ShowOnLogged>
                <NavLink to='/' onClick={logoutUser} className={styles.logout}>
                  Logout
                </NavLink>
                <a href='#' className={styles.user}>
                  <FaUser className='--mr' />
                  {username}
                </a>
                <NavLink to='/orders' className={activeLink}>
                  Orders
                </NavLink>
              </ShowOnLogged>
              <HideOnLogged>
                <NavLink to='/login' className={activeLink}>
                  Login
                </NavLink>
              </HideOnLogged>
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
