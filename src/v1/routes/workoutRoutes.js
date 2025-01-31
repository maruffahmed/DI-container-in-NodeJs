const express = require("express");
const WorkoutController = require("../../controllers/workoutController");
const RecordController = require("../../controllers/recordController");
const { makeInvoker } = require("awilix-express");

const router = express.Router();
const workoutApi = makeInvoker(WorkoutController);
const recordApi = makeInvoker(RecordController);

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get("/", workoutApi("getAllWorkouts"));

router.get("/:workoutId", workoutApi("getOneWorkout"));

router.get("/:workoutId/records", recordApi("getRecordForWorkout"));

router.post("/", workoutApi("createNewWorkout"));

router.patch("/:workoutId", workoutApi("updateOneWorkout"));

router.delete("/:workoutId", workoutApi("deleteOneWorkout"));

module.exports = router;
