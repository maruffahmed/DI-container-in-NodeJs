const { v4: uuid } = require("uuid");

class WorkoutService {
  constructor({ workout }) {
    this.Workout = workout;
  }

  getAllWorkouts(filterParams) {
    return this.Workout.getAllWorkouts(filterParams);
  }

  getOneWorkout(workoutId) {
    return this.Workout.getOneWorkout(workoutId);
  }

  createNewWorkout(newWorkout) {
    const workoutToInsert = {
      ...newWorkout,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    return this.Workout.createNewWorkout(workoutToInsert);
  }

  updateOneWorkout(workoutId, changes) {
    return this.Workout.updateOneWorkout(workoutId, changes);
  }

  deleteOneWorkout(workoutId) {
    return this.Workout.deleteOneWorkout(workoutId);
  }
}

module.exports = WorkoutService;
