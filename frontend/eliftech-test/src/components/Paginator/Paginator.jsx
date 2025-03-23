import React from 'react';

import styles from './Paginator.module.css';

const Paginator = ({ page, totalPages, setPage: onPageChange }) => {

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pagination__button}
                onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
            >
                &#x2190;
            </button>

            <div className={styles.pagination__pages}>Page {page} of {totalPages}</div>

            <button
                className={styles.pagination__button}
                onClick={() => onPageChange((prev) => (prev < totalPages ? prev + 1 : prev))}
                disabled={page === totalPages}
            >
                &#x2192;
            </button>
        </div>
    );
}

export default Paginator;