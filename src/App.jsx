import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Footer } from './components';
import { ShowOnAdmin } from './components/Display/Display';
import ProductDetails from './components/Product/ProductDetails/ProductDetails';
import { Home, Contact, Login, Register, Reset, Admin } from './pages';

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
