import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles['not-found']}>
      <div>
        <h2>404</h2>
        <p>There's nothing here mate.</p>
        <Link to='/'>
          <button className='--btn --btn-primary'>Come Back!</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
