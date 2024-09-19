const { Router } = require("express");
const Tutor = require("../../database/models/Tutor");
const Pet = require("../../database/models/Pet");

const petsRoute = Router();

petsRoute.post("/pet/:tutorId", async (req, res) => {
  const TutorId = Number(req.params.tutorId); // Mudar isso pois é gambiarra
  const name = req.body.name;
  const species = req.body.species;
  const carry = req.body.carry;
  const weight = req.body.weight;
  const date_of_birth = req.body.date_of_birth;

  const isValidId = /^\d+$/.test(req.params.tutorId);
  if (!isValidId) {
    return res.status(400).json({
      message: "Tutor ID is invalid.",
      status: 400,
      error: "Bad Request"
    });
  }

  if (!TutorId || !name || !species || !carry || !weight || !date_of_birth) {
    return res.status(400).json({
      message: "Input fields is empty!",
      status: 400,
      error: "Bad Request"
    });
  }

  const PetData = {
    name,
    species,
    carry,
    weight,
    date_of_birth,
    TutorId,
  };

  const getTutorData = await Tutor.findOne({ where: { id: TutorId } });
  if (!getTutorData) {
    return res
      .status(404)
      .json({
        message: "Tutor is not found!",
        status: 404,
        error: "Not Found"
      });
  }

  try {
    await Pet.create(PetData).then(() => {
      res.status(201).send(PetData);
    });
  } catch (err) {
    console.log(err);
  }
});

petsRoute.put("/pet/:petId/tutor/:tutorId", async (req, res) => {
  const petId = Number(req.params.petId);
  const tutorId = Number(req.params.tutorId);
  const name = req.body.name;
  const species = req.body.species;
  const carry = req.body.carry;
  const weight = req.body.weight;
  const date_of_birth = req.body.date_of_birth;

  const isValidTutorId = /^\d+$/.test(req.params.tutorId);
  const isValidPetId = /^\d+$/.test(req.params.petId);
  if (!isValidTutorId && isValidPetId) {
    return res.status(400).json({
      message: "Tutor or Pet ID is invalid.",
      status: 400,
      error: "Bad Request"
    });
  }

  if (
    !tutorId ||
    !petId ||
    !name ||
    !species ||
    !carry ||
    !weight ||
    !date_of_birth
  ) {
    return res.status(400).json({
      message: "Input fields is empty!",
      status: 400,
      error: "Bad Request"
    });
  }

  const PetData = {
    name,
    species,
    carry,
    weight,
    date_of_birth,
  };

  const PetDataSearch = await Pet.findOne({
    where: { id: petId, TutorId: tutorId },
  });
  if (!PetDataSearch) {
    return res.status(404).json({
      message: "Tutor or ID pet is not found.",
      status: 404,
      error:"Not Found"
    });
  }

  try {
    await Pet.update(PetData, { where: { id: petId, TutorId: tutorId } }).then(
      () => {
        res.status(201).json({
          message: "Pet updated sucessfully!",
          status: 201,
          info: "Created"
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

petsRoute.delete("/pet/:petId/tutor/:tutorId", async (req, res) => {
  const petId = Number(req.params.petId);
  const tutorId = Number(req.params.tutorId);

  const isValidTutorId = /^\d+$/.test(req.params.tutorId);
  const isValidPetId = /^\d+$/.test(req.params.petId);
  if (!isValidTutorId && isValidPetId) {
    return res.status(400).json({
      message: "Tutor or Pet ID is invalid.",
      status: 400,
      error: "Bad Request"
    });
  }

  const PetSearch = await Pet.findOne({
    where: { id: petId, TutorId: tutorId },
  });
  if (!PetSearch) {
    return res.status(404).json({ message: "Tutor or pet id not found!", status: 404, error: "Not Found" });
  }

  try {
    await Pet.destroy({ where: { id: petId, TutorId: tutorId } }).then(
      async () => {
        res.status(204).json({ message: "Delete was sucessfull." });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = petsRoute;
