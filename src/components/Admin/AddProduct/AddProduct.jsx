import { useState } from 'react';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db, storage } from '../../../firebase/config';
import { selectProducts } from '../../../redux/features/productSlice';
import Card from '../../Card/Card';
import styles from './AddProduct.module.scss';

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

const detectForm = (id, f1, f2) => {
  if (id === 'add') {
    return f1;
  } else {
    return f2;
  }
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

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

  const editProduct = (e) => {
    e.preventDefault();
    toast.loading('Processing your request...');
    if (product.imageURL !== productEdit.imageURL) {
      const imageRef = ref(storage, productEdit.imageURL);
      deleteObject(imageRef);
    }
    try {
      setDoc(doc(db, 'products', id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        categories: product.categories,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      toast.dismiss();
      toast.success('Product edited successfully', { theme: 'colored' });
      navigate('/admin/products');
    } catch (err) {
      toast.dismiss();
      toast.error(`${err}`, { theme: 'colored' });
    }
  };

  return (
    <div className={styles.product}>
      <h2 className='--my'>{detectForm(id, 'Add Product', 'Edit Product')}</h2>
      <Card cardClass={styles.card}>
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
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
