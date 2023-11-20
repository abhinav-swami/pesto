import React from "react";

const TaskCard = ({ task, handleUpdateStatus, handleDelete }) => (
  <div key={task._id} className={`card mb-2 ${task.status === "To Do" ? "border-gray" : ""}`}>
    <div className="card-header d-flex justify-content-between align-items-center">
      <span>{task.title}</span>
      <span className={`badge bg-${task.status === "To Do" ? "secondary" : task.status === "Done" ? "success" : "warning"}`}>{task.status}</span>
    </div>
    <div className="card-body">
      <p className="card-text">{task.description}</p>
    </div>
    <div className="card-footer text-end">
      <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleUpdateStatus(task)}>
        Update Status
      </button>
      &nbsp;
      <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(task._id)}>
        Delete
      </button>
    </div>
  </div>
);

export default TaskCard;
