class WorkoutController {
  constructor({ workoutService }) {
    this.workoutService = workoutService;
  }

  getAllWorkouts(req, res) {
    const { mode } = req.query;
    try {
      const allWorkouts = this.workoutService.getAllWorkouts({ mode });
      res.send({ status: "OK", data: allWorkouts });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  getOneWorkout(req, res) {
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
      const workout = this.workoutService.getOneWorkout(workoutId);
      res.send({ status: "OK", data: workout });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  createNewWorkout(req, res) {
    const { body } = req;
    if (
      !body.name ||
      !body.mode ||
      !body.equipment ||
      !body.exercises ||
      !body.trainerTips
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
        },
      });
      return;
    }
    const newWorkout = {
      name: body.name,
      mode: body.mode,
      equipment: body.equipment,
      exercises: body.exercises,
      trainerTips: body.trainerTips,
    };
    try {
      const createdWorkout = this.workoutService.createNewWorkout(newWorkout);
      res.status(201).send({ status: "OK", data: createdWorkout });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  updateOneWorkout(req, res) {
    const {
      body,
      params: { workoutId },
    } = req;
    if (!workoutId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty" },
      });
    }
    try {
      const updatedWorkout = this.workoutService.updateOneWorkout(
        workoutId,
        body
      );
      res.send({ status: "OK", data: updatedWorkout });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  deleteOneWorkout(req, res) {
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
      this.workoutService.deleteOneWorkout(workoutId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}

module.exports = WorkoutController;
