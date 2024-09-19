const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')

const Tutor = require('../../database/models/Tutor')
const Pet = require('../../database/models/Pet')

const emailValidation = require('../../utils/validations/emailValidation')
const nameValidation = require('../../utils/validations/nameValidation')

const TutorController = require('../../controllers/Tutor/TutorController')

const tutorRouter = Router()

tutorRouter.post(
  '/tutor',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      date_of_birth: Joi.date().required(),
      zip_code: Joi.string().required(),
    },
  }),
  TutorController.createTutor
)

tutorRouter.put(
  '/tutor/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      date_of_birth: Joi.date().required(),
      zip_code: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  TutorController.updateTutor
)

tutorRouter.delete(
  '/tutor/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  TutorController.deleteTutor
)

module.exports = tutorRouter
