import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../redux/features/orderSlice';
import Card from '../Card/Card';
import styles from './Chart.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrders);
  const array = [];

  orders.map((order) => {
    return array.push(order.orderStatus);
  });

  const getStatusCounter = (array, value) => {
    return array.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = ['Order placed', 'Processing', 'Shipped', 'Delivered'];

  const placed = getStatusCounter(array, q1);
  const processing = getStatusCounter(array, q2);
  const shipped = getStatusCounter(array, q3);
  const delivered = getStatusCounter(array, q4);

  const data = {
    labels: ['Order placed', 'Processing', 'Shipped', 'Delivered'],
    datasets: [
      {
        label: 'Order Count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
