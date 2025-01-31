const DB = require("./db.json");

/**
 * @openapi
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: ad75d475-ac57-44f4-a02a-8f6def58ff56
 *         workout:
 *           type: string
 *           example: 4a3d9aaa-608c-49a7-a004-66305ad4ab50
 *         record:
 *           type: string
 *           example: 7:23 minutes
 */

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
module.exports = { getRecordForWorkout };
