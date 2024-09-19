const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')

const Tutor = require('../../database/models/Tutor')
const Pet = require('../../database/models/Pet')

const emailValidation = require('../../utils/validations/emailValidation')
const nameValidation = require('../../utils/validations/nameValidation')

const TutorController = require('../../controllers/Tutor/TutorController')

const tutorRouter = Router()

// tutorRouter.post("/tutor", async (req, res) => {
//   const name = req.body.name;
//   const phone = req.body.phone;
//   const email = req.body.email;
//   const date_of_birth = req.body.date_of_birth;
//   const zip_code = req.body.zip_code;

//   if (!name || !phone || !email || !date_of_birth || !zip_code) {
//     return res.status(400).json({
//       message: "All fields must be filled in!",
//       status: 400,
//       error: "Bad Request"
//     });
//   }

//   if (!emailValidation(email)) {
//     return res.status(400).json({
//       message: "Email is invalid." ,
//       status: 400,
//       error: "Bad Request"
//     });
//   }
//   if (nameValidation(name)) {
//     return res.status(400).send({
//       message: "Name is invalid." ,
//       status: 400,
//       error: "Bad Request"
//     });
//   }

//   const emailExists = await Tutor.findOne({where: {email}});
//   if(emailExists) {
//     return res.status(400).send({
//       message: "Email already in use." ,
//       status: 400,
//       error: "Bad Request"
//     })
//   }

//   const dateValidation = dayjs(date_of_birth);
//   if(!dateValidation.isValid()) {
//     return res.status(400).send({
//       message: "Date is invalid." ,
//       status: 400,
//       error: "Bad Request"
//     })
//   }
//   console.log(dateValidation)

//   const TutorData = {
//     name,
//     phone,
//     email,
//     date_of_birth,
//     zip_code,
//   };

//   try {
//     await Tutor.create(TutorData)
//       .then(() => {
//         res.status(201).json({
//           message: "Tutor successfully registered.",
//           status: 201,
//           info: "Created"
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// });

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

// tutorRouter.put('/tutor/:id', async (req, res) => {
//   const id = Number(req.params.id)
//   const name = req.body.name
//   const phone = req.body.phone
//   const email = req.body.email
//   const date_of_birth = req.body.date_of_birth
//   const zip_code = req.body.date_of_birth

//   const isValidId = /^\d+$/.test(req.params.id)
//   if (!isValidId) {
//     return res.status(400).json({
//       message: 'ID is invalid.',
//       status: 400,
//       error: 'Bad Request',
//     })
//   }

//   if (!name || !phone || !email || !date_of_birth || !zip_code) {
//     return res.status(400).json({
//       message: 'Input fields is empty!',
//       status: 400,
//       error: 'Bad Request',
//     })
//   }

//   if (nameValidation(name)) {
//     return res.status(400).json({
//       message: 'Name is invalid!',
//       status: 400,
//       error: 'Bad Request',
//     })
//   }

//   if (!emailValidation(email)) {
//     return res.status(400).json({
//       message: 'Email is invalid!',
//       status: 400,
//       error: 'Bad Request',
//     })
//   }

//   const TutorSearch = await Tutor.findOne({ where: { id: id } })
//   if (!TutorSearch) {
//     return res.status(400).json({
//       message: 'Tutor id not exists in database.',
//       status: 400,
//       error: 'Bad Request',
//     })
//   }

//   const TutorData = {
//     id,
//     name,
//     phone,
//     email,
//     date_of_birth,
//     zip_code,
//   }

//   try {
//     await Tutor.update(TutorData, { where: { id: id } }).then(() => {
//       res.status(201).json({
//         message: 'Tutor registration updated successfully.',
//         status: 201,
//         error: 'Created',
//       })
//     })
//   } catch (err) {
//     console.log(err)
//   }
// })

// tutorRouter.delete('/tutor/:id', async (req, res) => {
//   const id = Number(req.params.id)

//   const isValidId = /^\d+$/.test(req.params.id)
//   if (!isValidId) {
//     return res.status(400).json({
//       message: 'ID is invalid.',
//       status: 400,
//       error: 'Bad Request',
//     })
//   }

//   const TutorSearch = await Tutor.findOne({ where: { id: id } })
//   const PetSearch = await Pet.findOne({ where: { TutorId: id } })

//   if (!PetSearch && !TutorSearch) {
//     return res.status(400).json({
//       message: 'Id provided not exists in database.',
//       status: 400,
//       error: 'Bad Request',
//     })
//   }

//   try {
//     await Pet.destroy({ where: { TutorId: id } })
//     await Tutor.destroy({ where: { id: id } })
//       .then(async () => {
//         res.status(204).json({
//           message: 'Delete was sucessfull!',
//           status: 204,
//           info: 'Tutor has been deleted suceffuly.',
//         })
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   } catch (err) {
//     console.log(err)
//   }
// })

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
