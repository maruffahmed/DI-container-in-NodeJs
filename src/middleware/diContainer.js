const { asClass, asValue, createContainer } = require("awilix");

const Record = require("../database/Record");
const Workout = require("../database/Workout");
const WorkoutService = require("../services/workoutService");
const RecordService = require("../services/recordService");

const container = createContainer();

container.register({
  workoutService: asClass(WorkoutService).scoped(),
  recordService: asClass(RecordService).scoped(),
  record: asValue(Record),
  workout: asValue(Workout),
});

module.exports = container;
