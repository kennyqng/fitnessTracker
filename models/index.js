const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now(),
    require: true
  },
  exercises: [
    {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      weight: {
        type: Number
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      },
      duration: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
