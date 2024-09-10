const { Router } = require("express");
const Tutor = require("../../database/models/Tutor");
const Pet = require("../../database/models/Pet");

const tutorsRouter = Router();

tutorsRouter.get("/tutors", async (req, res) => {
  const Tutors = await Tutor.findAll({ include: Pet });
  if (!Tutors) {
    return res.status(400).json({ message: "Data not found." });
  }
  res.status(200).send({ Tutors });
});

module.exports = tutorsRouter;
