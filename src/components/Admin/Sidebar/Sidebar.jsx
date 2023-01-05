import { useSelector } from 'react-redux';
import { FaUserLock } from 'react-icons/fa';
import { selectUsername } from '../../../redux/features/authSlice';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Sidebar = () => {
  const username = useSelector(selectUsername);

  return (
    <div className={styles.sidebar}>
      <div className={styles.user}>
        <FaUserLock size={40} color='#fff' />
        <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/admin/home' className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-product/add' className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/products' className={activeLink}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/orders' className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
