import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { selectOrders, STORE_ORDERS } from '../../../redux/features/orderSlice';
import styles from './Orders.module.scss';

const Orders = () => {
  const { data } = useFetchCollection('orders');
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/admin/order/${id}`);
  };

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data, dispatch]);

  return (
    <section>
      <h2 className='--my'>Orders</h2>
      <div className={styles.table}>
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} onClick={() => handleClick(order.id)}>
                  <td>{index + 1}</td>
                  <td>
                    {order.orderDate} at {order.orderTime}
                  </td>
                  <td>{order.id}</td>
                  <td>
                    <b>${order.orderAmount.toFixed(2)}</b>
                  </td>
                  <td>
                    <p className={order.orderStatus !== 'Delivered' ? styles.pending : styles.delivered}>{order.orderStatus}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Orders;
