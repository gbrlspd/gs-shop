import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn, selectEmail } from '../../redux/features/authSlice';

export const ShowOnLogged = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

export const HideOnLogged = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return null;
  } else {
    return children;
  }
};

export const ShowOnAdmin = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) {
    return children;
  } else {
    return (
      <section style={{ height: '100vh' }}>
        <div className='container'>
          <h2 className='--fw-bold --color-danger'>Permission denied!</h2>
          <p>This page can only be accessed by an administrator user.</p>
          <Link to='/'>
            <button className='--btn --btn-primary --my'>Return</button>
          </Link>
        </div>
      </section>
    );
  }
};

export const ShowOnAdminLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) {
    return children;
  } else {
    return null;
  }
};
