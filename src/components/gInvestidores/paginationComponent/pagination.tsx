import React, { useState } from "react";
import "./pagination.css";
interface Props {
  itemsPerPage: number;
  totalItems: number | undefined;
  paginate: (pageNumber: number) => void;
  paginationDisabled: boolean;
}

const Pagination: React.FC<Props> = ({
  itemsPerPage,
  totalItems,
  paginate,
  paginationDisabled,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageNumbers: number[] = [];

  if (totalItems) {
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    if (
      number === currentPage ||
      number === currentPage - 1 ||
      number === currentPage + 1
    ) {
      return (
        <button
          key={number}
          className={
            number === currentPage
              ? "pagination-button active"
              : "pagination-button"
          }
          onClick={() => handleClick(number)}
          disabled={paginationDisabled}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  return <div className="pagination">{renderPageNumbers}</div>;
};

export default Pagination;
