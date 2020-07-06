const express = require("express");
const mongoose = require("mongoose");
const db = require("./models/index.js");
const path = require("path");
const { find } = require("./models/index.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.find({}).then(data => {
    const n = data.length - 1;
    console.log(data[n]);
    res.json(data);
  });
});

app.post("/api/workouts", (req, res) => {
  db.create({}).then(data => res.json(data));
});

app.put("/api/workouts/:id?", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log(body);
  db.findByIdAndUpdate({ _id: id }, { $push: { exercises: body } })
  .then(data =>
    res.json(data)
  );
});


app.get("/api/workouts/range", (req, res) => {
  db.find({}).then(data => {
    res.json(data);
  })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
