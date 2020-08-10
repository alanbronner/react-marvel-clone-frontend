import React from "react";

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  let paginationHandler = [];

  for (let i = 1; i < totalPages; i++) {
    const paginate = (
      <button
        className="btn"
        key={i}
        onClick={() => {
          setCurrentPage(i);
        }}
      >
        {i}
      </button>
    );
    paginationHandler.push(paginate);
  }
  return <>{paginationHandler}</>;
}

export default Pagination;
