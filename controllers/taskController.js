const Task = require("../models/Task");

const validateTask = (req, res, next) => {
  const { title, description, status } = req.body;

  if (!title || title.length < 1) {
    return res.status(400).json({ error: "Title is required and must be a non-empty string." });
  }

  if (!description || description.length < 1) {
    return res.status(400).json({ error: "Description must be a non-empty string." });
  }

  if (!status || !["To Do", "In Progress", "Done"].includes(status)) {
    return res.status(400).json({ error: 'Status is required and must be one of: "To Do", "In Progress", "Done".' });
  }

  next();
};

const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const statusFilter = req.query.status;

    if (statusFilter && !["To Do", "In Progress", "Done"].includes(statusFilter)) {
      return res.status(400).json({ error: 'Invalid status filter. Supported values: "To Do", "In Progress", "Done".' });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const query = statusFilter ? { status: statusFilter } : {};

    if (endIndex < (await Task.countDocuments(query).exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
        status: statusFilter,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
        status: statusFilter,
      };
    }

    results.tasks = await Task.find(query).limit(limit).skip(startIndex).exec();

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["To Do", "In Progress", "Done"].includes(status)) {
    return res.status(400).json({ error: 'Status is required and must be one of: "To Do", "In Progress", "Done".' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json(updatedTask);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  validateTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
