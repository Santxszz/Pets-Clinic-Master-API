const { Router } = require("express");

const Tutor = require("../../database/models/Tutor");
const Pet = require("../../database/models/Pet");

const emailValidation = require("../../utils/validations/emailValidation");
const nameValidation = require("../../utils/validations/nameValidation");

const tutorRouter = Router();

tutorRouter.post("/tutor", async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const date_of_birth = req.body.date_of_birth;
  const zip_code = req.body.zip_code;

  if (!name || !phone || !email || !date_of_birth || !zip_code) {
    return res.status(400).json({ message: "Input fields is empty!" });
  }

  if (!emailValidation(email)) {
    return res.status(400).json({ message: "Email is invalid!" });
  }
  if (nameValidation(name)) {
    return res.status(400).send({ message: "Name is invalid" });
  }

  const TutorData = {
    name,
    phone,
    email,
    date_of_birth,
    zip_code,
  };

  try {
    await Tutor.create(TutorData)
      .then(() => {
        res.status(201).json({ message: `Tutor successfully registered.` });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

tutorRouter.put("/tutor/:id", async (req, res) => {
  const id = Number(req.params.id);
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const date_of_birth = req.body.date_of_birth;
  const zip_code = req.body.date_of_birth;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Id provided is invalid!" });
  }

  if (!name || !phone || !email || !date_of_birth || !zip_code) {
    return res.status(400).json({ message: "Input fields is empty!" });
  }

  if (nameValidation(name)) {
    return res.status(400).json({ message: `Name is invalid!` });
  }

  if (!emailValidation(email)) {
    return res.status(400).json({ message: `Email is invalid!` });
  }

  const TutorSearch = await Tutor.findOne({ where: { id: id } });
  if (!TutorSearch) {
    return res
      .status(400)
      .json({ message: "Tutor id not exists in database." });
  }

  const TutorData = {
    id,
    name,
    phone,
    email,
    date_of_birth,
    zip_code,
  };

  try {
    await Tutor.update(TutorData, { where: { id: id } }).then(() => {
      res
        .status(201)
        .json({ message: "Tutor registration updated successfully." });
    });
  } catch (err) {
    console.log(err);
  }
});

tutorRouter.delete("/tutor/:id", async (req, res) => {
  const id = Number(req.params.id);

  console.log(id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Id provided is invalid!" });
  }

  const TutorSearch = await Tutor.findOne({ where: { id: id } });
  const PetSearch = await Pet.findOne({ where: { TutorId: id } });

  if (!PetSearch && !TutorSearch) {
    return res
      .status(400)
      .json({ message: "Id provided not exists in database." });
  }

  try {
    await Pet.destroy({ where: { TutorId: id } });
    await Tutor.destroy({ where: { id: id } })
      .then(async () => {
        res.status(204).json({ message: "Delete was sucessfull!" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = tutorRouter;
