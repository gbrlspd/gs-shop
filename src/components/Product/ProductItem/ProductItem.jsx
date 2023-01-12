import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_TO_CART, GET_QTY } from '../../../redux/features/cartSlice';
import Card from '../../Card/Card';
import styles from './ProductItem.module.scss';

const ProductItem = ({ grid, id, name, price, desc, imageURL, product }) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(GET_QTY());
  };

  return (
    <Card cardClass={grid ? styles.grid : styles.list}>
      <Link to={`/product/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>${price}</p>
          <h4>{shortenText(name, 20)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
        <button className='--btn --btn-success' onClick={() => addToCart(product)}>
          Add to Cart!
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
