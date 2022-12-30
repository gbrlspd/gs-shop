import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaGoogle, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '../../firebase/config';
import styles from './Auth.module.scss';
import loginImg from '../../assets/login.svg';
import Card from '../../components/card/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    toast.loading('Processing your request...');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.dismiss();
        toast.success(`E-mail ${userCredential.user.email} successfully logged in`, { theme: 'colored' });
        navigate('/');
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(`[${error.code}] ${error.message}`, { theme: 'colored' });
      });
  };

  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success(`User ${result.user.displayName} successfully logged in`, { theme: 'colored' });
        navigate('/');
      })
      .catch((error) => {
        toast.error(`[${error.code}] ${error.message}`, { theme: 'colored' });
      });
  };

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
          <form onSubmit={loginUser}>
            <input type='text' placeholder='E-mail' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              type='password'
              placeholder='••••••••'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='--btn --btn-primary --btn-block'>Login</button>
            <div className={styles.links}>
              <Link to='/reset'>Forget your Password?</Link>
            </div>
          </form>
          <button type='submit' className='--btn --btn-danger --btn-block --my' onClick={loginWithGoogle}>
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
