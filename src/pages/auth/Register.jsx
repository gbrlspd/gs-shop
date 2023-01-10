import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/config';
import styles from './Auth.module.scss';
import registerImg from '../../assets/register.svg';
import Card from '../../components/Card/Card';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      toast.error('The passwords do not match', { theme: 'colored' });
    }
    toast.loading('Processing your request...');
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.dismiss();
        toast.success(`E-mail ${userCredential.user.email} successfully registered`, { theme: 'colored' });
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
            <h2>Register</h2>
            <FaUserPlus className='--ml' size={30} color='#1e90ff' />
          </div>
          <form onSubmit={registerUser}>
            <input type='text' placeholder='E-mail' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              type='password'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Repeat Password'
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register
            </button>
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
