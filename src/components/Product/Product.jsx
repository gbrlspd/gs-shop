import { useDispatch, useSelector } from 'react-redux';
import ProductFilter from './ProductFilter/ProductFilter';
import ProductList from './ProductList/ProductList';
import { selectProducts, STORE_PRODUCTS } from '../../redux/features/productSlice';
import useFetchCollection from '../../customHooks/useFetchCollection';
import styles from './Product.module.scss';
import { useEffect } from 'react';

const Product = () => {
  const { data } = useFetchCollection('products');
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
};

export default Product;
