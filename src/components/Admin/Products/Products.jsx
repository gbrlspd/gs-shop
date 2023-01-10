import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Notiflix from 'notiflix';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { db, storage } from '../../../firebase/config';
import { deleteObject, ref } from 'firebase/storage';
import { selectProducts, STORE_PRODUCTS } from '../../../redux/features/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import styles from './Products.module.scss';

const Products = () => {
  const { data } = useFetchCollection('products');
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

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
    dispatch(STORE_PRODUCTS({ products: data }));
  }, [dispatch, data]);

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
