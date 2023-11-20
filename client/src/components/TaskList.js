import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, handleUpdateStatus, handleDelete }) => (
  <div>
    {tasks.map((task) => (
      <TaskCard key={task._id} task={task} handleUpdateStatus={handleUpdateStatus} handleDelete={handleDelete} />
    ))}
  </div>
);

export default TaskList;
