"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const package_json_1 = require("../../package.json");
const logger_1 = __importDefault(require("./logger"));
const fs_1 = __importDefault(require("fs"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo App API",
            version: package_json_1.version,
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Serve Swagger UI
    //   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        customCss: `
          ${fs_1.default.readFileSync("./src/utils/SwaggerDark.css")}
        `,
    }));
    // Serve Swagger JSON
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    // Log Swagger availability
    // log.info(`Swagger docs available at http://localhost:${port}/docs`);
    app.use((req, res, next) => {
        const host = req.get("host");
        const protocol = req.protocol;
        logger_1.default.info(`Swagger docs available at ${protocol}://${host}/docs`);
        next();
    });
}
exports.default = swaggerDocs;
