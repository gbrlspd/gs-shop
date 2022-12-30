import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaKey } from 'react-icons/fa';
import styles from './Auth.module.scss';
import resetImg from '../../assets/reset.svg';
import Card from '../../components/card/Card';

const Reset = () => {
  return (
    <section className={`${styles.auth} container`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <h2>Reset Password</h2>
            <FaKey className='--ml' size={30} color='#1e90ff' />
          </div>
          <form>
            <input type='text' placeholder='E-mail' required />
            <button className='--btn --btn-primary --btn-block'>Reset</button>
            <p className='--text-sm'>We will send you a link to reset your password</p>
          </form>
          <span className={styles.register}>
            <Link to='/register'>
              Register now! <FaUserPlus className='--ml' size={18} />
            </Link>
            <Link to='/login'>
              Login now! <FaSignInAlt className='--ml' size={18} />
            </Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={resetImg} alt='Login' height={242} />
      </div>
    </section>
  );
};

export default Reset;
