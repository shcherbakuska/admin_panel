import React from 'react';
import './Pagination.css';

const Pagination = ({ studentsPerPage, totalStudents, currentPage, paginate, onStudentsPerPageChange }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalStudents / studentsPerPage);

    // Генерация номеров страниц
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
            pageNumbers.push('...');
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
    }

    return (
        <div className="pagination-container">
            <ul className="pagination">
                {currentPage > 1 && (
                    <li onClick={() => paginate(currentPage - 1)}>
                        <span className="pagination-arrow">←</span>
                    </li>
                )}
                {pageNumbers.map((number, index) => (
                    <li
                        key={index}
                        onClick={() => number !== '...' ? paginate(number) : null}
                        className={`${currentPage === number ? 'active' : ''} ${number === '...' ? 'ellipsis' : ''}`}
                    >
                        {number}
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li onClick={() => paginate(currentPage + 1)}>
                        <span className="pagination-arrow">→</span>
                    </li>
                )}
            </ul>
            <select
                value={studentsPerPage}
                onChange={(e) => onStudentsPerPageChange(Number(e.target.value))}
                className="students-per-page"
            >
                <option value={10}>10/стр.</option>
                <option value={20}>20/стр.</option>
                <option value={30}>30/стр.</option>
                <option value={50}>50/стр.</option>
            </select>
        </div>
    );
};

export default Pagination;
