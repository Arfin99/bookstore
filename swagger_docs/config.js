import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const swaggerJSDocs = YAML.load("./swagger_docs/api.yaml");

const options = {
  customCss: `img {content:url(\'../logo.svg\'); height:auto;} `,
  customfavIcon: "../favicon.ico",
  customSiteTitle: "Online Bookstore",
};

export const swaggerServe = swaggerUI.serve;
export const swaggerSetup = swaggerUI.setup(swaggerJSDocs, options);
