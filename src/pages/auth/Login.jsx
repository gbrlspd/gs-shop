import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaGoogle, FaUserPlus } from 'react-icons/fa';
import styles from './Auth.module.scss';
import loginImg from '../../assets/login.svg';
import Card from '../../components/card/Card';

const Login = () => {
  return (
    <section className={`${styles.auth} container`}>
      <div className={styles.img}>
        <img src={loginImg} alt='Login' height={339} />
      </div>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <h2>Login</h2>
            <FaSignInAlt className='--ml' size={30} color='#1e90ff' />
          </div>
          <form>
            <input type='text' placeholder='E-mail' required />
            <input type='password' placeholder='••••••••' required />
            <button className='--btn --btn-primary --btn-block'>Login</button>
            <div className={styles.links}>
              <Link to='/reset'>Forget you Password?</Link>
            </div>
          </form>
          <button className='--btn --btn-danger --btn-block --my'>
            <FaGoogle className='--mr' />
            Login with Google
          </button>
          <span className={styles.register}>
            <Link to='/register'>
              Register now! <FaUserPlus className='--ml' size={18} />
            </Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;
