require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SK);
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!');
});

const array = [];
const calculateOrderAmount = (items) => {
  items.map((item) => {
    const { price, cartQty } = item;
    const cartItemAmount = price * cartQty;
    return array.push(cartItemAmount);
  });
  const totalAmount = array.reduce((a, b) => {
    return a + b;
  }, 0);
  return totalAmount * 100;
};

app.post('/create-payment-intent', async (req, res) => {
  const { items, shipping, description } = req.body;
  console.log(items, shipping, description);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line,
        city: shipping.city,
        country: shipping.country,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const port = process.env.REACT_APP_PORT || 4242;
app.listen(port, () => console.log(`Server listening on port ${port}`));
