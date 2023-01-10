import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../redux/features/filterSlice';
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/features/productSlice';
import styles from './ProductFilter.module.scss';

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(10000);
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');

  const allCategories = ['All', ...new Set(products.map((product) => product.categories))];
  const allBrands = ['All', ...new Set(products.map((product) => product.brand))];

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setBrand('All');
    filterProducts('All');
    setPrice(maxPrice);
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [brand, dispatch, products]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [price, dispatch, products]);

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              type='button'
              key={index}
              value={cat}
              className={category === cat ? styles.active : ''}
              onClick={(e) => filterProducts(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <div className={styles.brand}>
        <h4>Brand</h4>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h4>Price</h4>
      <p className='--fw-bold'>${price}</p>
      <div className={styles.price}>
        <input type='range' min={minPrice} max={maxPrice} value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <button className='--btn --btn-danger --my2' onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilter;
