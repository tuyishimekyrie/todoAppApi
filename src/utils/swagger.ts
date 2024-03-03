import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import log from "./logger";
import fs from "fs"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo App API",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["../../index.ts", "./src/routers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Serve Swagger UI
//   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

     app.use(
       "/docs",
       swaggerUi.serve,
       swaggerUi.setup(swaggerSpec, {
         customCss: `
          ${fs.readFileSync("./src/utils/SwaggerDark.css")}
        `,
       })
     );
  // Serve Swagger JSON
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Log Swagger availability
  // log.info(`Swagger docs available at http://localhost:${port}/docs`);
  app.use((req, res, next) => {
    log.info(`Swagger docs available at http://${req.get("host")}/docs`);
    next();
  });
}

export default swaggerDocs;
