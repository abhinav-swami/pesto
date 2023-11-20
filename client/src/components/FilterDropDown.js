import React from "react";

const FilterDropdown = ({ statusFilter, setStatusFilter, setPage }) => (
  <div className="container text-end mb-2">
    <div className="row justify-content-end">
      <div className="col-4">
        <label>
          <select
            className="form-select"
            aria-label="Status Filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            {["", "To Do", "In Progress", "Done"].map((filter) => (
              <option key={filter} value={filter}>
                {filter || "All"}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  </div>
);

export default FilterDropdown;
