import React from "react";

const Form = ({ newTask, handleInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <div className="row mb-3 align-items-center">
      <div className="col-9">
        <input value={newTask.title} onChange={handleInputChange} required className="form-control" placeholder="Title" name="title" />
      </div>
      <div className="col-3">
        <button type="submit" className="btn btn-outline-dark btn-sm">
          Add Task
        </button>
      </div>
    </div>

    <div className="row mb-3">
      <div className="col">
        <textarea name="description" value={newTask.description} onChange={handleInputChange} className="form-control" placeholder="Description" />
      </div>
    </div>
  </form>
);

export default Form;
