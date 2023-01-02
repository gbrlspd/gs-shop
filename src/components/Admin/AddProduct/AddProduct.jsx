import { useState } from 'react';
import Card from '../../Card/Card';
import styles from './AddProduct.module.scss';

const categories = [
  { id: 1, name: 'Router' },
  { id: 2, name: 'Switch' },
  { id: 3, name: 'AP' },
  { id: 4, name: 'Server' },
  { id: 5, name: 'NAS' },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    imageURL: '',
    price: '',
    category: '',
    brand: '',
    desc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {};

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className={styles.product}>
      <h2 className='--my'>Add Product</h2>
      <Card cardClass={styles.card}>
        <form onSubmit={addProduct}>
          <label>Name:</label>
          <input
            type='text'
            placeholder='UniFi AC Pro'
            required
            name='name'
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Image:</label>
          <div className={styles.progress}>
            <div className={styles['progress-bar']} style={{ width: '50%' }}>
              Uploading 50%
            </div>
          </div>
          <input type='file' placeholder='Product Image' accept='image/*' name='image' onChange={(e) => handleImageChange(e)} />
          <input type='text' name='imageURL' value={product.imageURL} disabled />
          <label>Price:</label>
          <input
            type='number'
            placeholder='500'
            required
            name='price'
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Category:</label>
          <select required name='category' value={product.category} onChange={(e) => handleInputChange(e)}>
            <option value='' disabled>
              Choose the Category
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <label>Brand:</label>
          <input
            type='text'
            placeholder='Ubiquiti'
            required
            name='brand'
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Description:</label>
          <textarea
            placeholder='Dual-band Wi-Fi 5 AP designed to support high-density, and mission-critical environments.'
            required
            name='desc'
            value={product.desc}
            rows='8'
            onChange={(e) => handleInputChange(e)}
          ></textarea>
          <button type='submit' className='--btn --btn-success --btn-block'>
            Save
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
