import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaKey } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../../firebase/config';
import styles from './Auth.module.scss';
import resetImg from '../../assets/reset.svg';
import Card from '../../components/Card/Card';

const Reset = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const resetPassword = (e) => {
    e.preventDefault();
    toast.loading('Processing your request...');
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.dismiss();
        toast.success(`E-mail successfully sent, and don't forget to check your Spam`, { theme: 'colored' });
        navigate('/login');
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(`[${error.code}] ${error.message}`, { theme: 'colored' });
      });
  };

  return (
    <section className={`${styles.auth} container`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <h2>Reset Password</h2>
            <FaKey className='--ml' size={30} color='#1e90ff' />
          </div>
          <form onSubmit={resetPassword}>
            <input type='text' placeholder='E-mail' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Reset
            </button>
          </form>
          <p className='--my'>We will send you a link to reset your password.</p>
          <span className={styles.register}>
            <Link to='/register' className='--btn --btn-success --w50'>
              Register now! <FaUserPlus className='--ml' size={18} />
            </Link>
            <Link to='/login' className='--btn --btn-success --w50'>
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
