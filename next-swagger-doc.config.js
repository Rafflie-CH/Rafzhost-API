module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rafzhost API",
      version: "1.0.0",
      description: "API Documentation Rafzhost",
    },
  },
  apis: ["./pages/api/**/*.js"], // path ke semua API endpoints
};
