import { useState } from 'react';
import { BsGridFill, BsListUl } from 'react-icons/bs';
import Search from '../../Search/Search';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.scss';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState('');

  return (
    <div className={styles['product-list']}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsGridFill size={20} color='orangered' onClick={() => setGrid(true)} />
          <BsListUl size={24} color='orangered' onClick={() => setGrid(false)} />
          <p>
            <b>{products.length}</b> Products found.
          </p>
        </div>
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select>
            <option value='latest'>Latest</option>
            <option value='lowest-price'>Lowest Price</option>
            <option value='highest-price'>Highest Price</option>
            <option value='a-z'>A - Z</option>
            <option value='z-a'>Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? styles.grid : ''}>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
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
