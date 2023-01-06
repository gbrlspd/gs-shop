import { Link } from 'react-router-dom';
import Card from '../../Card/Card';
import styles from './ProductItem.module.scss';

const ProductItem = ({ grid, id, name, price, desc, imageURL }) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
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
        <button className='--btn --btn-success'>Add to Cart!</button>
      </div>
    </Card>
  );
};

export default ProductItem;
