import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa';
import { selectProducts, STORE_PRODUCTS } from '../../../redux/features/productSlice';
import { GET_TOTAL_ORDER_AMOUNT, selectOrders, selectTotalOrderAmount, STORE_ORDERS } from '../../../redux/features/orderSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import InfoBox from '../../InfoBox/InfoBox';
import styles from './Home.module.scss';
import Chart from '../../Chart/Chart';

const incomesIcon = <AiFillDollarCircle size={30} color='#28a745' />;
const productsIcon = <BsCart4 size={30} color='#1f93ff' />;
const ordersIcon = <FaCartArrowDown size={30} color='orangered' />;

const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrders);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  const dispatch = useDispatch();

  const fetchProducts = useFetchCollection('products');
  const fetchOrders = useFetchCollection('orders');

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: fetchProducts.data }));
    dispatch(STORE_ORDERS(fetchOrders.data));
    dispatch(GET_TOTAL_ORDER_AMOUNT());
  }, [dispatch, fetchProducts, fetchOrders]);

  return (
    <div className={styles.home}>
      <h2 className='--my'>Dashboard</h2>
      <div className={styles['info-box']}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title='Incomes'
          count={`$${totalOrderAmount.toFixed(2)}`}
          icon={incomesIcon}
        />
        <InfoBox cardClass={`${styles.card} ${styles.card2}`} title='Products' count={products.length} icon={productsIcon} />
        <InfoBox cardClass={`${styles.card} ${styles.card3}`} title='Orders' count={orders.length} icon={ordersIcon} />
      </div>
      <Chart />
    </div>
  );
};

export default Home;
