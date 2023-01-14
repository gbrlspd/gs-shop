import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { GET_QTY, GET_SUBTOTAL, selectCartItems, selectCartTotalAmount } from '../../redux/features/cartSlice';
import { selectEmail } from '../../redux/features/authSlice';
import { selectBillingAddress, selectShippingAddress } from '../../redux/features/checkoutSlice';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const customerEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const dispatch = useDispatch();
  const description = `GenericShop: Email: ${customerEmail}, Amount: $${totalAmount}`;

  useEffect(() => {
    dispatch(GET_SUBTOTAL());
    dispatch(GET_QTY());
  }, [dispatch, cartItems]);

  useEffect(() => {
    fetch('http://localhost:3001/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        toast.error(error, { theme: 'colored' });
      });
  }, [billingAddress, cartItems, customerEmail, description, shippingAddress]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='container'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
