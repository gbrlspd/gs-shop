import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Notiflix from 'notiflix';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { db, storage } from '../../../firebase/config';
import styles from './Products.module.scss';
import { deleteObject, ref } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { STORE_PRODUCTS } from '../../../redux/features/productSlice';

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getProducts = () => {
    toast.loading('Processing your request...');
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, (querySnapshot) => {
        toast.dismiss();
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        dispatch(STORE_PRODUCTS({ products: allProducts }));
      });
    } catch (error) {
      toast.dismiss();
      toast.error(`${error.message}`, { theme: 'colored' });
    }
  };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Deleting Product',
      'Are you sure about that?',
      'Yes',
      'No',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {},
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    toast.loading('Processing your request...');
    try {
      await deleteDoc(doc(db, 'products', id));
      const imageRef = ref(storage, imageURL);
      await deleteObject(imageRef);
      toast.dismiss();
      toast.success('Product deleted successfully', { theme: 'colored' });
    } catch (error) {
      toast.dismiss();
      toast.error(`${error}`, { theme: 'colored' });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.table}>
      <h2 className='--my'>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={product.imageURL} alt={product.name} style={{ width: '100px' }} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.categories}</td>
                  <td>${product.price}</td>
                  <td className={styles.icons}>
                    <Link to={`/admin/add-product/${product.id}`}>
                      <FaEdit size={20} color='green' />
                    </Link>
                    &nbsp;
                    <FaTrashAlt size={20} color='orangered' onClick={() => confirmDelete(product.id, product.imageURL)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
