const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi= require("swagger-ui-express");
const serviceBasePath = `/rest/api`;

module.exports = function (app) {
    let swaggerDefinition = {
        swagger: "2.0",
        info: {
            title: "STUDENT AUTHORITY SERVICE API's",
            description: "RESTful API for STUDENT AUTHORITY SERVICE",
            version: "1.0",
        },
        Servers: [
            {
              url: `http://${process.env.REMOTE_HOST}:${process.env.PORT}`,
    
            },
        ],
        produces: ["application/json"],
        host: process.env.HOST_NAME,
        basePath: serviceBasePath,
    };
    let options = {
        swaggerDefinition: swaggerDefinition,
        explore: true,
        apis: [
            path.join(__dirname, "../controllers/*.js"),
            path.join(__dirname, "../routers/*.js"),
        ],
    };
    let extraOptions = {
        explore: true,
        swaggerOptions: {
            validatorUrl: null,
        },
        customSiteTitle: "Swagger - STUDENT ADMIN",
    };

    swaggerSpec = swaggerJSDoc(options);
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, extraOptions)

    );
};