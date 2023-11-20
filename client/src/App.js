import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import FilterDropdown from "./components/FilterDropDown";
import TaskList from "./components/TaskList";
import { Pagination } from "./components/Pagination";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "To Do" });
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ next: null, previous: null });

  useEffect(() => {
    fetchTasks();
  }, [page, limit, statusFilter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/tasks?page=${page}&limit=${limit}&status=${statusFilter}`);
      setTasks(data.tasks);
      setPagination(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (task) => {
    try {
      const nextStatus = getNextStatus(task.status);
      await axios.put(`/api/tasks/${task._id}`, { status: nextStatus, title: task.title, description: task.description });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusOrder = ["To Do", "In Progress", "Done"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    return statusOrder[nextIndex];
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tasks", newTask);
      fetchTasks();
      setNewTask({ title: "", description: "", status: "To Do" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container-xs mt-5">
      <h1 className="mb-4">Task Manager</h1>
      <Form newTask={newTask} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      <FilterDropdown statusFilter={statusFilter} setStatusFilter={setStatusFilter} setPage={setPage} />
      <TaskList tasks={tasks} handleUpdateStatus={handleUpdateStatus} handleDelete={handleDelete} />
      <Pagination page={page} pagination={pagination} handlePageChange={handlePageChange} />
    </div>
  );
};

export default App;
