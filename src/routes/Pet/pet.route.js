const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')

const PetController = require('../../controllers/Pet/PetController')

const Tutor = require('../../database/models/Tutor')
const Pet = require('../../database/models/Pet')

const petsRoute = Router()

petsRoute.post(
  '/pet/:tutorId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      species: Joi.string().required(),
      carry: Joi.string().required(),
      weight: Joi.number().required(),
      date_of_birth: Joi.date().required(),
    },
    [Segments.PARAMS]: {
      tutorId: Joi.number().required(),
    },
  }),
  PetController.createPet
)

petsRoute.put(
  '/pet/:petId/tutor/:tutorId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      species: Joi.string().required(),
      carry: Joi.string().required(),
      weight: Joi.number().required(),
      date_of_birth: Joi.date().required(),
    },
    [Segments.PARAMS]: {
      tutorId: Joi.number().required(),
      petId: Joi.number().required(),
    },
  }),
  PetController.updatePet
)

petsRoute.delete(
  '/pet/:petId/tutor/:tutorId',
  celebrate({
    [Segments.PARAMS]: {
      tutorId: Joi.number().required(),
      petId: Joi.number().required(),
    },
  }),
  PetController.deletePet
)

module.exports = petsRoute
