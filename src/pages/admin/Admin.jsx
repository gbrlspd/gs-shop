import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './Admin.module.scss';
import { Sidebar, Home, AddProduct, Products, Orders } from '../../components/Admin';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/products' element={<Products />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
