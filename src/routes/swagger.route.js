import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import { Router } from "express";

const swaggerRouter = Router();

swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get("/", swaggerUi.setup(swaggerDocument));

export default swaggerRouter;
