class RecordService {
  constructor({ record }) {
    this.Record = record;
  }
  getRecordForWorkout(workoutId) {
    return this.Record.getRecordForWorkout(workoutId);
  }
}

module.exports = RecordService;
