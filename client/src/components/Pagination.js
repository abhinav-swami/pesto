import React from "react";

export const Pagination = ({ pagination, handlePageChange, page }) => (
  <div className="row mt-3 justify-content-end">
    <div className="col-auto">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${!pagination.previous ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(pagination.previous.page)} disabled={!pagination.previous}>
              Previous
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">{page}</button>
          </li>
          <li className={`page-item ${!pagination.next ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(pagination.next.page)} disabled={!pagination.next}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);
