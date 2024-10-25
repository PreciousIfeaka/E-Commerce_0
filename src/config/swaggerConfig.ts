import swaggerJSDoc from "swagger-jsdoc";
import { config } from ".";
import { version } from "../../package.json";
import { ProfileSchema } from "../docs";

const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "E-Commerce Express API with Swagger",
    version,
    description: "OpenAPI documentation for E-Commerce Project",
  },
  servers: [
    {
      url: config.BASE_URL,
      description: "Production server",
    },
    {
      url: `http://localhost:${config.PORT}`,
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "A list of routes for Authentication",
    },
    {
      name: "Users",
      description: "A list of routes for Users",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Profile: ProfileSchema,
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/docs/*.ts"],
};

const swaggerSpecs = swaggerJSDoc(options);

export default swaggerSpecs;
