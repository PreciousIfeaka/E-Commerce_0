import cors from "cors";
import express, { Express, Request, Response } from "express";
import {
  authRouter,
  categoryRouter,
  productRouter,
  profileRouter,
  subcategoryRouter,
} from "./routes";
import swaggerUi from "swagger-ui-express";
import { errorHandler, routeNotFound } from "./middleware";
import swaggerSpecs from "./config/swaggerConfig";

const app: Express = express();
app.options("*", cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req: Request, res: Response) => {
  res.send({
    message:
      "I am the responder for e-commerce api. Visit /api/docs to access the openapi documentation.",
  });
});
app.get("/api/v1", (_req: Request, res: Response) => {
  res.send({
    message: "I am the responder for e-commerce api",
  });
});

app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", subcategoryRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", productRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/openapi.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpecs);
});
app.use(errorHandler);
app.use(routeNotFound);

export default app;
