import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({
    onPageChange,
    totalPageCount,
    currentPage,
    ...rest
  }) => {

  const range = (start, end) => {
    const array = [];
    for(let i = start; i <= end; i++) {
      array.push(i);
    }
    return array;
  };

  const pagination = () => {
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

    return range(leftSiblingIndex, rightSiblingIndex);
  }
  
  const paginationRange = pagination();

  return (
    <ul
      className={styles['pagination-container']}
      style={{ ...rest }}
    >
      
      <li
        className={`${styles['pagination-item']} ${
          currentPage === 1 ? styles['disabled'] : ''
        }`}
        onClick={() => onPageChange(1)}
      >
        Первая
      </li>
      <li
        className={`${styles['pagination-item']} ${
          currentPage === 1 ? styles['disabled'] : ''
        }`}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <div className={`${styles['arrow']} ${styles['left']} `}/>
      </li>
      {paginationRange.map(pageNumber => {
        return (
          <li
            key={pageNumber}
            className={`${styles['pagination-item']} ${
              pageNumber === currentPage ? styles['selected'] : ''
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${styles['pagination-item']} ${
          currentPage === totalPageCount ? styles['disabled'] : ''
        }`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <div className={`${styles['arrow']} ${styles['right']}`}/>
      </li>
      <li
        className={`${styles['pagination-item']} ${
          currentPage === totalPageCount ? styles['disabled'] : ''
        }`}
        onClick={() => onPageChange(totalPageCount)}
      >
        Последняя
      </li>
    </ul>
  );
};

export { Pagination };