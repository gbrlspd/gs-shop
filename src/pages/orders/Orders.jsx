import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { selectUserID } from '../../redux/features/authSlice';
import { selectOrders, STORE_ORDERS } from '../../redux/features/orderSlice';
import styles from './Orders.module.scss';

const Orders = () => {
  const { data } = useFetchCollection('orders');
  const orders = useSelector(selectOrders);
  const userID = useSelector(selectUserID);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/order/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data, dispatch]);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Orders</h2>
        <div className={styles.table}>
          {filteredOrders.length === 0 ? (
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
                {filteredOrders.map((order, index) => (
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
      </div>
    </section>
  );
};

export default Orders;
