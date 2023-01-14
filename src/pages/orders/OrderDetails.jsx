import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import styles from './OrderDetails.module.scss';

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const { document } = useFetchDocument('orders', id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  // console.log(document.cartItems);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <button className='--btn --btn-danger --my'>
          <Link to='/orders' className='--text-light'>
            All Orders
          </Link>
        </button>
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
      </div>
    </section>
  );
};

export default OrderDetails;
