import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import { ADD_TO_CART, DECREASE_FROM_CART, GET_QTY, selectCartItems } from '../../../redux/features/cartSlice';
import styles from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const item = cartItems.find((i) => i.id === id);

  const isAdded = cartItems.findIndex((i) => {
    return i.id === id;
  });

  const getProduct = async () => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(result);
    } else {
      toast.error('Product not found!', { theme: 'colored' });
    }
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(GET_QTY());
  };

  const decreaseItem = (product) => {
    dispatch(DECREASE_FROM_CART(product));
    dispatch(GET_QTY());
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <button className='--btn --btn-danger --my'>
          <Link to='/' className='--text-light'>
            Return
          </Link>
        </button>
        <div className={styles.details}>
          <div className={styles.img}>
            <img src={product.imageURL} alt={product.name} />
          </div>
          <div className={styles.content}>
            <h3>{product.name}</h3>
            <p className={styles.price}>${product.price}</p>
            <p>{product.desc}</p>
            <p>
              <b>SKU:</b> {product.id}
            </p>
            <p>
              <b>Brand:</b> {product.brand}
            </p>
            <div className={styles.count}>
              {isAdded < 0 ? null : (
                <>
                  <button className='--btn --btn-danger' onClick={() => decreaseItem(product)}>
                    -
                  </button>
                  <p>
                    <b>{item.cartQty}</b>
                  </p>
                  <button className='--btn --btn-success' onClick={() => addToCart(product)}>
                    +
                  </button>
                </>
              )}
              <button className='--btn --btn-success' onClick={() => addToCart(product)}>
                Add to Cart!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
