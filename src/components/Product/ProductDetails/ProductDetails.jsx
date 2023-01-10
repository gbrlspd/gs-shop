import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import styles from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

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
              <button className='--btn'>-</button>
              <p>
                <b>1</b>
              </p>
              <button className='--btn'>+</button>
              <button className='--btn --btn-success'>Add to Cart!</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
