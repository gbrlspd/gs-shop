import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

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
              <NavLink to='/login' className={activeLink}>
                Login
              </NavLink>
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

        <div className={styles['menu-icon']}>
          {cart}
          <FaBars size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
