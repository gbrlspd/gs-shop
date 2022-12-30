import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/authSlice';

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
