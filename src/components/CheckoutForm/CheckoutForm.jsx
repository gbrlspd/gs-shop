import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from './CheckoutForm.module.scss';
import Card from '../Card/Card';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import { selectEmail, selectUserID } from '../../redux/features/authSlice';
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/features/cartSlice';
import { selectShippingAddress } from '../../redux/features/checkoutSlice';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const saveOrder = (e) => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: 'Order placed',
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, 'orders'), orderConfig);
      dispatch(CLEAR_CART());
      toast.info('Order in progress...', { theme: 'colored' });
      navigate('/checkout-success');
    } catch (err) {
      toast.error(`${err}`, { theme: 'colored' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // eslint-disable-next-line no-unused-vars
    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/checkout-success',
        },
        redirect: 'if_required',
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message, { theme: 'colored' });
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === 'succeeded') {
            setIsLoading(false);
            toast.success('Successful payment', { theme: 'colored' });
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>
              <p className='--my'>
                <a className='--color-danger' href='https://stripe.com/docs/testing' target='_blank' rel='noreferrer'>
                  Use the Stripe test card! Click here to check how.
                </a>
              </p>
              <PaymentElement id={styles['payment-element']} options={paymentElementOptions} />
              <button disabled={isLoading || !stripe || !elements} id='submit' className={styles.button}>
                <span id='button-text'>{isLoading ? <div className={styles.spinner} id='spinner'></div> : 'Pay now'}</span>
              </button>
              {message && <div id={styles['payment-message']}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
