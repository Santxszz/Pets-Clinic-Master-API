// Bibliotecas
const express = require("express");
const dbConnect = require("./database/connect");
const dotenv = require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerDocumentation = require("../swagger.json");

// Routes
const tutorsRouter = require("./routes/Tutor/tutors.route");
const tutorRouter = require("./routes/Tutor/tutor.route");
const petsRoute = require("./routes/Pet/pet.route");
const { errors } = require("celebrate");

// Instâncias
const app = express();

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.use(tutorsRouter);
app.use(tutorRouter);
app.use(petsRoute);

// Rota Api Docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

// Middleware Celebrate Errors
app.use(errors())

// Conexão DB
dbConnect.sync().then(() => {
  app.listen(process.env.portServer);
});
