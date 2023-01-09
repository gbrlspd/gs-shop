import { useEffect, useState } from 'react';
import { BsGridFill, BsListUl } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS } from '../../../redux/features/filterSlice';
import Search from '../../Search/Search';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.scss';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  return (
    <div className={styles['product-list']}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsGridFill size={20} color='orangered' onClick={() => setGrid(true)} />
          <BsListUl size={24} color='orangered' onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='latest'>Latest</option>
            <option value='lowest-price'>Lowest Price</option>
            <option value='highest-price'>Highest Price</option>
            <option value='a-z'>A - Z</option>
            <option value='z-a'>Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? styles.grid : ''}>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductItem {...product} grid={grid} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
