import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <section>
      <div className='container'>
        <h2>Successful payment</h2>
        <p className='--my'>Thank you for your purchase.</p>
        <button className='--btn --btn-primary'>
          <Link to='/orders' style={{ color: '#fff' }}>
            View Orders
          </Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
