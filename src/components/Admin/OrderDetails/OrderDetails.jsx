import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import ChangeOrderStatus from '../../ChangeOrderStatus/ChangeOrderStatus';
import styles from './OrderDetails.module.scss';

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const { document } = useFetchDocument('orders', id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={styles.table}>
        <h2 className='--my'>Order Details</h2>
        {order === {} ? (
          <p>Please wait...</p>
        ) : (
          <div>
            <p>
              Order ID: <b>{order.id}</b>
            </p>
            <p>
              Order Amount: <b style={{ color: 'green' }}>${order.orderAmount}</b>
            </p>
            <p>
              Order Status: <b>{order.orderStatus}</b>
            </p>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(order.cartItems)
                  ? order.cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <b>{index + 1}</b>
                        </td>
                        <td>
                          <p style={{ marginBottom: '10px' }}>
                            <b>{item.name}</b>
                          </p>
                          <img src={item.imageURL} alt={item.name} className={styles.image} />
                        </td>
                        <td>
                          <b style={{ color: 'green' }}>${item.price.toFixed(2)}</b>
                        </td>
                        <td>{item.cartQty}</td>
                        <td>
                          <b style={{ color: 'green' }}>${(item.price * item.cartQty).toFixed(2)}</b>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </section>
  );
};

export default OrderDetails;
