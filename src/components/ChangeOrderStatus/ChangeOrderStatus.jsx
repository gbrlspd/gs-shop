import { setDoc, Timestamp, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import Card from '../Card/Card';
import styles from './ChangeOrderStatus.module.scss';

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const setOrder = (e, id) => {
    e.preventDefault();

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, 'orders', id), orderConfig);
      toast.info('Status changed', { theme: 'colored' });
      navigate('/admin/orders');
    } catch (err) {
      toast.error(`${err}`, { theme: 'colored' });
    }
  };

  return (
    <div className={styles.status}>
      <Card cardClass={styles.card}>
        <h4>Update Status</h4>
        <form onSubmit={(e) => setOrder(e, id)}>
          <span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='' disabled>
                Change the Status
              </option>
              <option value='Order placed'>Order placed</option>
              <option value='Processing'>Processing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </span>
          <span>
            <button type='submit' className='--btn --btn-primary'>
              Update Status
            </button>
          </span>
        </form>
      </Card>
    </div>
  );
};

export default ChangeOrderStatus;
