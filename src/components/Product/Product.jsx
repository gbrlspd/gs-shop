import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCogs } from 'react-icons/fa';
import ProductFilter from './ProductFilter/ProductFilter';
import ProductList from './ProductList/ProductList';
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from '../../redux/features/productSlice';
import useFetchCollection from '../../customHooks/useFetchCollection';
import styles from './Product.module.scss';

const Product = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { data } = useFetchCollection('products');
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
    dispatch(GET_PRICE_RANGE({ products: data }));
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={showFilter ? `${styles.filter} ${styles.show}` : styles.filter}>
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          <ProductList products={products} />
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={32} color='orangered' />
            <p>
              <b>{showFilter ? 'Hide Filter' : 'Show Filter'}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
