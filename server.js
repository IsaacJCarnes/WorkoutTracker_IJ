const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

app.get("/stats", (req, res) => {
  res.sendFile(__dirname + "/public/stats.html");
});

app.get("/exercise", (req, res) => {
  res.sendFile(__dirname + "/public/exercise.html");
});

//Workouts contains all Workout objects
app.get("/api/workouts", (req, res) => { //Get last workout
  db.Workout.find({}).sort({_id:-1}).limit(1)
  .then(dbWorkout => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

app.put("/api/workouts/:id", ({body}, res) => { //Create and Add new Workout to Workouts
  db.Workout.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { workout: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", ({body}, res) => { //Create new workout
   
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});