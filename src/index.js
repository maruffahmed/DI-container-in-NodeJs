const dotenv = require("dotenv");
const express = require("express");
const apicache = require("apicache");
const { scopePerRequest } = require("awilix-express");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const { swaggerDocs: v1SwaggerDocs } = require("./v1/swagger");
const container = require("./middleware/diContainer");

dotenv.config();

const app = express();
const cache = apicache.middleware;
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json());

app.use(scopePerRequest(container));
app.use(cache("2 minutes"));
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  v1SwaggerDocs(app, PORT);
});
