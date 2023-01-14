import { useState } from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, setCurrentPage, productsPerPage, totalProducts }) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;

  /* Limit the numbers displayed in the pagination */
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li className={currentPage === pageNumbers[0] ? `${styles.hidden} ${styles.text}` : styles.text} onClick={prevPage}>
        Prev.
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li key={number} onClick={() => paginate(number)} className={currentPage === number ? styles.active : ''}>
              {number}
            </li>
          );
        }
        return null;
      })}
      <li
        className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden} ${styles.text}` : styles.text}
        onClick={nextPage}
      >
        Next
      </li>
      <p>
        <b className={styles.page}>Page {currentPage}</b>
        &nbsp;of&nbsp;
        <b>{Math.ceil(totalPages)} pages</b>
      </p>
    </ul>
  );
};

export default Pagination;
