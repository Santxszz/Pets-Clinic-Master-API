const dayjs = require('dayjs')

const Tutor = require('../../database/models/Tutor')

const CreateTutorService = require('../../services/Tutor/CreateTutorService')
const ListTutorsService = require('../../services/Tutor/ListTutorsService')
const UpdateTutorService = require('../../services/Tutor/UpdateTutorService')
const DeleteTutorService = require('../../services/Tutor/DeleteTutorService')

const emailValidation = require('../../utils/validations/emailValidation')
const nameValidation = require('../../utils/validations/nameValidation')
const Pet = require('../../database/models/Pet')

module.exports.listTutors = async (req, res, next) => {
  const listTutors = await ListTutorsService.ListTutorsService()
  if (listTutors.length <= 0) {
    return res.status(404).json({
      message: 'Tutors is not found.',
      status: 404,
      error: 'Not found.',
    })
  }

  return res.status(200).json(listTutors)
}

module.exports.createTutor = async (req, res, next) => {
  const name = req.body.name
  const phone = req.body.phone
  const email = req.body.email
  const date_of_birth = req.body.date_of_birth
  const zip_code = req.body.zip_code

  if (!name || !phone || !email || !date_of_birth || !zip_code) {
    return res.status(400).json({
      message: 'All fields must be filled in!',
      status: 400,
      error: 'Bad Request',
    })
  }

  if (!emailValidation(email)) {
    return res.status(400).json({
      message: 'Email is invalid.',
      status: 400,
      error: 'Bad Request',
    })
  }
  if (nameValidation(name)) {
    return res.status(400).send({
      message: 'Name is invalid.',
      status: 400,
      error: 'Bad Request',
    })
  }

  const emailExists = await Tutor.findOne({ where: { email } })
  if (emailExists) {
    return res.status(400).send({
      message: 'Email already in use.',
      status: 400,
      error: 'Bad Request',
    })
  }

  const dateValidation = dayjs(date_of_birth)
  if (!dateValidation.isValid()) {
    return res.status(400).send({
      message: 'Date is invalid.',
      status: 400,
      error: 'Bad Request',
    })
  }

  await CreateTutorService.CreateTutorService(
    name,
    phone,
    email,
    date_of_birth,
    zip_code
  )

  return res.status(201).json({
    message: 'Tutor successfully registered.',
    status: 201,
    info: 'Created',
  })
}

module.exports.updateTutor = async (req, res, next) => {
  const id = req.params.id
  const name = req.body.name
  const phone = req.body.phone
  const email = req.body.email
  const date_of_birth = req.body.date_of_birth
  const zip_code = req.body.zip_code

  const tutorExists = await Tutor.findOne({ where: { id: id } })
  if (!tutorExists) {
    return res.status(404).json({
      message: 'Tutor not found.',
      status: 404,
      info: 'Not found',
    })
  }

  if (!emailValidation(email)) {
    return res.status(400).json({
      message: 'Email is invalid.',
      status: 400,
      error: 'Bad Request',
    })
  }
  if (nameValidation(name)) {
    return res.status(400).send({
      message: 'Name is invalid.',
      status: 400,
      error: 'Bad Request',
    })
  }

  const emailExists = await Tutor.findOne({ where: { email: email } })
  if (emailExists && email !== tutorExists.email) {
    return res.status(400).json({
      message: 'Email already in use.',
      status: 400,
      info: 'Bad Request',
    })
  }

  await UpdateTutorService.UpdateTutorService(
    name,
    phone,
    email,
    date_of_birth,
    zip_code,
    id
  )
  return res.status(201).json({
    message: 'Tutor registration updated successfully.',
    status: 201,
    info: 'Created',
  })
}

module.exports.deleteTutor = async (req, res, next) => {
  const id = req.params.id

  const TutorSearch = await Tutor.findOne({ where: { id: id } })
  const PetSearch = await Pet.findOne({ where: { TutorId: id } })

  if (!PetSearch && !TutorSearch) {
    return res.status(400).json({
      message: 'Id provided not exists in database.',
      status: 400,
      error: 'Bad Request',
    })
  }

  await DeleteTutorService.DeleteTutorService(id)
  return res.status(204).json()
}
