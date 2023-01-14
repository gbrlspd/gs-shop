import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQty } from '../../redux/features/cartSlice';
import Card from '../Card/Card';
import styles from './CheckoutSummary.module.scss';

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQty = useSelector(selectCartTotalQty);

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        <div>
          <p>
            Cart Items: <b>{cartTotalQty}</b>
          </p>
          <div className={styles.text}>
            <h4>Subtotal:</h4>
            <h3>
              <b>$ {cartTotalAmount.toFixed(2)}</b>
            </h3>
          </div>
          {cartItems.map((item, index) => (
            <Card cardClass={styles.card} key={index}>
              <h4>{item.name}</h4>
              <p>
                Quantity: <b style={{ color: '#333' }}>{item.cartQty}</b>
              </p>
              <p>
                Unit Price: <b>${item.price}</b>
              </p>
              <p>
                Total Price: <b>${item.cartQty * item.price}</b>
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
