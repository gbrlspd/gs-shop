import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import Card from '../../Card/Card';
import styles from './AddProduct.module.scss';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const categories = [
  { id: 1, name: 'Router' },
  { id: 2, name: 'Switch' },
  { id: 3, name: 'AP' },
  { id: 4, name: 'Server' },
  { id: 5, name: 'NAS' },
];

const initialState = {
  name: '',
  imageURL: '',
  price: '',
  category: '',
  brand: '',
  desc: '',
};

const AddProduct = () => {
  const [product, setProduct] = useState({ ...initialState });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images_gp-shop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(`[${error.code}] ${error.message}`, { theme: 'colored' });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success('Image uploaded successfully', { theme: 'colored' });
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    toast.loading('Processing your request...');
    try {
      // eslint-disable-next-line no-unused-vars
      const docRef = addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        categories: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setProduct({ ...initialState });
      setUploadProgress(0);
      toast.dismiss();
      toast.success('Product added successfully', { theme: 'colored' });
    } catch (err) {
      toast.dismiss();
      toast.error(`${err}`, { theme: 'colored' });
    }
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
          {uploadProgress === 0 ? null : (
            <div className={styles.progress}>
              <div className={styles['progress-bar']} style={{ width: `${uploadProgress}%` }}>
                {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Upload completed!'}
              </div>
            </div>
          )}
          <input type='file' placeholder='Product Image' accept='image/*' name='image' onChange={(e) => handleImageChange(e)} />
          {product.imageURL === '' ? null : <input type='text' name='imageURL' value={product.imageURL} disabled />}
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
