import cors from "cors";
import express, { Express, Request, Response } from "express";

const app: Express = express()
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
    ]
  })
);

app.use(express.json({}));
app.use(express.urlencoded());
app.get("/", (_req: Request, res: Response) => {
  res.send({
    message: "I am the responder for e-commerce api. Visit /api/docs to access the openapi documentation."
  });
});
app.get("/api/v1", (_req: Request, res: Response) => {
  res.send({
    message: "I am the responder for e-commerce api"
  });
});
export default app;