import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import {
  ADD_TO_CART,
  DECREASE_FROM_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_SUBTOTAL,
  GET_QTY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQty,
  SAVE_URL,
} from '../../redux/features/cartSlice';
import styles from './Cart.module.scss';
import Card from '../../components/Card/Card';
import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/features/authSlice';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQty = useSelector(selectCartTotalQty);
  const isLogged = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = window.location.href;

  const checkout = () => {
    if (isLogged) {
      navigate('/checkout-details');
    } else {
      dispatch(SAVE_URL(url));
      navigate('/login');
    }
  };

  const decreaseItem = (item) => {
    dispatch(DECREASE_FROM_CART(item));
  };

  const increaseItem = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const removeItem = (item) => {
    dispatch(REMOVE_FROM_CART(item));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(GET_SUBTOTAL());
    dispatch(GET_QTY());
    dispatch(SAVE_URL(''));
  }, [dispatch, cartItems]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            <p className='--my'>Your cart is empty.</p>
            <Link to='/' className='--btn --btn-success'>
              Continue Shopping!
            </Link>
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty.</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const { id, name, price, imageURL, cartQty } = item;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p style={{ marginBottom: '10px' }}>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} className={styles.image} />
                      </td>
                      <td>$ {price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className='--btn --btn-danger' onClick={() => decreaseItem(item)}>
                            -
                          </button>
                          <p>
                            <b>{cartQty}</b>
                          </p>
                          <button className='--btn --btn-success' onClick={() => increaseItem(item)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>$ {(price * cartQty).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt size={20} color='orangered' onClick={() => removeItem(item)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className='--btn --btn-danger' onClick={clearCart}>
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <Link to='/' className='--btn --btn-danger'>
                  Continue Shopping!
                </Link>
                <Card cardClass={styles.card}>
                  <p>
                    Cart Items: <b>{cartTotalQty}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>$ {cartTotalAmount.toFixed(2)}</h3>
                  </div>
                  <p>Tax and shipping calculated at checkout.</p>
                  <button className='--btn --btn-success --btn-block' onClick={checkout}>
                    Proceed to Checkout!
                  </button>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
