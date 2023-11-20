const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_HOSTURL = process.env.MONGODB_HOSTURL;
const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOSTURL}/?retryWrites=true&w=majority`);

app.use(bodyParser.json());
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
