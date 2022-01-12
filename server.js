const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

//Workouts contains all Workout objects
app.get("/api/workouts", (req, res) => { //Get last workout
    //db.Workouts.find
});

app.put("/api/workouts/:id", ({body}, res) => { //Create and Add new Workout to Workouts
  db.Workout.create(body)
    .then(({_id}) => db.Workouts.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", ({body}, res) => { //Create new workout
   
});

app.get("/api/workouts/range", (req, res) => {
  db.Book.find({})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});