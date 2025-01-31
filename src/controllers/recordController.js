class RecordController {
  constructor({ recordService }) {
    this.recordService = recordService;
  }

  getRecordForWorkout(req, res) {
    const {
      params: { workoutId },
    } = req;
    if (!workoutId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty" },
      });
    }
    try {
      const records = this.recordService.getRecordForWorkout(workoutId);
      res.send({ status: "OK", data: records });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}

module.exports = RecordController;
