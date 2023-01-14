import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Footer } from './components';
import { ShowOnAdmin } from './components/Display/Display';
import ProductDetails from './components/Product/ProductDetails/ProductDetails';
import OrderDetails from './pages/orders/OrderDetails';
import { Home, Contact, Login, Register, Reset, Admin, Cart, CheckoutDetails, Checkout, CheckoutSuccess, Orders } from './pages';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset' element={<Reset />} />
        <Route
          path='/admin/*'
          element={
            <ShowOnAdmin>
              <Admin />
            </ShowOnAdmin>
          }
        />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout-details' element={<CheckoutDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/order/:id' element={<OrderDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
