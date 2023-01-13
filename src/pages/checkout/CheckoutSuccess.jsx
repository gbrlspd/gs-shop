import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <section>
      <div className='container'>
        <h2>Successful payment</h2>
        <p className='--my'>Thank you for your purchase.</p>
        <Link>
          <button className='--btn --btn-primary'>View Orders</button>
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
