// Bibliotecas
const express = require("express");
const dotenv = require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const { errors } = require("celebrate");

const dbConnect = require("./database/connect");
const swaggerDocumentation = require("../swagger.json");

// Routes
const tutorsRouter = require("./routes/Tutor/tutors.route");
const tutorRouter = require("./routes/Tutor/tutor.route");
const petsRoute = require("./routes/Pet/pet.route");


// Instâncias
const app = express();

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Rotas
app.use(tutorsRouter);
app.use(tutorRouter);
app.use(petsRoute);

// Rota Api Docs
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

// Middleware Celebrate Errors
app.use(errors())

// Conexão DB
dbConnect.sync({force: true}).then(() => {
  app.listen(process.env.portServer);
});
