const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now //Defaults to today
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    duration: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    distance: {
        type: Number,
    }
  }]
});

WorkoutSchema.set('toJSON', {virtuals: true});

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce( function (total, exercise){ //Sums the duration for each exercise in workout
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
