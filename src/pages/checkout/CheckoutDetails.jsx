import { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/features/checkoutSlice';
import styles from './CheckoutDetails.module.scss';

const initialAddressState = {
  name: '',
  line: '',
  country: '',
  state: '',
  city: '',
  phone: '',
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
  const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate('/checkout');
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <Card cardClass={styles.card}>
            <h3>Shipping Address</h3>
            <label>Recipient Name</label>
            <input
              type='text'
              placeholder='Walter White'
              name='name'
              value={shippingAddress.name}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>Country</label>
            <CountryDropdown
              valueType='short'
              className={styles.select}
              value={shippingAddress.country}
              onChange={(value) => handleShipping({ target: { name: 'country', value: value } })}
              required
            />
            <label>Address Line</label>
            <input
              type='text'
              placeholder='3828 Piermont Dr, Albuquerque, NM'
              name='line'
              value={shippingAddress.line}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>State</label>
            <input
              type='text'
              placeholder='New Mexico'
              name='state'
              value={shippingAddress.state}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>City</label>
            <input
              type='text'
              placeholder='Albuquerque'
              name='city'
              value={shippingAddress.city}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>Phone</label>
            <input
              type='text'
              placeholder='+55 (11) 4002-8922'
              name='phone'
              value={shippingAddress.phone}
              onChange={(e) => handleShipping(e)}
              required
            />
          </Card>
          <Card cardClass={styles.card}>
            <h3>Billing Address</h3>
            <label>Name</label>
            <input
              type='text'
              placeholder='Walter White'
              name='name'
              value={billingAddress.name}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>Country</label>
            <CountryDropdown
              valueType='short'
              className={styles.select}
              value={billingAddress.country}
              onChange={(value) => handleBilling({ target: { name: 'country', value: value } })}
              required
            />
            <label>Address Line</label>
            <input
              type='text'
              placeholder='3828 Piermont Dr, Albuquerque, NM'
              name='line'
              value={billingAddress.line}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>State</label>
            <input
              type='text'
              placeholder='New Mexico'
              name='state'
              value={billingAddress.state}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>City</label>
            <input
              type='text'
              placeholder='Albuquerque'
              name='city'
              value={billingAddress.city}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>Phone</label>
            <input
              type='text'
              placeholder='+55 (11) 4002-8922'
              name='phone'
              value={billingAddress.phone}
              onChange={(e) => handleBilling(e)}
              required
            />
            <button type='submit' className='--btn --btn-success'>
              Proceed to Checkout
            </button>
          </Card>
        </form>
        <Card cardClass={`${styles.card} ${styles.summary}`}>
          <CheckoutSummary />
        </Card>
      </div>
    </section>
  );
};

export default CheckoutDetails;
