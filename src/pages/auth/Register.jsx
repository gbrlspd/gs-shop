import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import styles from './Auth.module.scss';
import registerImg from '../../assets/register.svg';
import Card from '../../components/card/Card';

const Register = () => {
  return (
    <section className={`${styles.auth} container`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <h2>Register</h2>
            <FaUserPlus className='--ml' size={30} color='#1e90ff' />
          </div>
          <form>
            <input type='text' placeholder='E-mail' required />
            <input type='password' placeholder='Password' required />
            <input type='password' placeholder='Repeat Password' required />
            <button className='--btn --btn-primary --btn-block'>Register</button>
          </form>
          <span className={styles.register}>
            <Link to='/login'>
              Already have an account? <FaSignInAlt className='--ml' size={18} />
            </Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt='Register' height={318} />
      </div>
    </section>
  );
};

export default Register;
