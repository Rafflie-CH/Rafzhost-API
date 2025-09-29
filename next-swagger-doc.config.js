module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rafzhost API",
      version: "1.0.0",
      description: "API Documentation Rafzhost",
    },
  },
  apis: ["./pages/api/**/*.js"], // semua endpoint di pages/api
};
