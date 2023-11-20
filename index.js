const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_HOSTURL = process.env.MONGODB_HOSTURL;

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOSTURL}/?retryWrites=true&w=majority`);

app.use(bodyParser.json());
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// const app = express();
// const PORT = process.env.PORT || 3001;

// mongoose.connect("mongodb+srv://abhinav:undefinednull@tlb.c2wnq3f.mongodb.net/?retryWrites=true&w=majority");

// const taskSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: String,
//     status: { type: String, enum: ["To Do", "In Progress", "Done"], required: true },
//   },
//   { versionKey: false }
// );

// const Task = mongoose.model("Task", taskSchema);

// app.use(bodyParser.json());

// const validateTask = (req, res, next) => {
//   const { title, description, status } = req.body;

//   if (!title || title.length < 1) {
//     return res.status(400).json({ error: "Title is required and must be a non-empty string." });
//   }

//   if (!description || description.length < 1) {
//     return res.status(400).json({ error: "Description must be a non-empty string." });
//   }

//   if (!status || !["To Do", "In Progress", "Done"].includes(status)) {
//     return res.status(400).json({ error: 'Status is required and must be one of: "To Do", "In Progress", "Done".' });
//   }

//   next();
// };

// app.get("/api/tasks", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // Current page, default is 1
//     const limit = parseInt(req.query.limit) || 10; // Tasks per page, default is 10
//     const statusFilter = req.query.status; // Optional status filter

//     if (statusFilter && !["To Do", "In Progress", "Done"].includes(statusFilter)) {
//       return res.status(400).json({ error: 'Invalid status filter. Supported values: "To Do", "In Progress", "Done".' });
//     }

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {};

//     // Build query based on optional status filter
//     const query = statusFilter ? { status: statusFilter } : {};

//     if (endIndex < (await Task.countDocuments(query).exec())) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//         status: statusFilter,
//       };
//     }

//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//         status: statusFilter,
//       };
//     }

//     results.tasks = await Task.find(query).limit(limit).skip(startIndex).exec();

//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/api/tasks", validateTask, async (req, res) => {
//   const { title, description, status } = req.body;
//   try {
//     const newTask = new Task({ title, description, status });
//     const savedTask = await newTask.save();
//     res.json(savedTask);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.put("/api/tasks/:id", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!status || !["To Do", "In Progress", "Done"].includes(status)) {
//     return res.status(400).json({ error: 'Status is required and must be one of: "To Do", "In Progress", "Done".' });
//   }

//   try {
//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true, runValidators: true } // Ensure validators are run during update
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ error: "Task not found." });
//     }

//     res.json(updatedTask);
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.delete("/api/tasks/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Task.findByIdAndDelete(id);
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
