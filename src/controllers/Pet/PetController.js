const dayjs = require('dayjs')

const CreatePetService = require('../../services/Pet/CreatePetService')
const UpdatePetService = require('../../services/Pet/UpdatePetService')
const DeletePetService = require('../../services/Pet/DeletePetService')

const Tutor = require('../../database/models/Tutor')
const Pet = require('../../database/models/Pet')

module.exports.createPet = async (req, res, next) => {
  const TutorId = Number(req.params.tutorId) // Mudar isso pois é gambiarra
  const name = req.body.name
  const species = req.body.species
  const carry = req.body.carry
  const weight = req.body.weight
  const date_of_birth = req.body.date_of_birth

  if (!TutorId || !name || !species || !carry || !weight || !date_of_birth) {
    return res.status(400).json({
      message: 'Input fields is empty!',
      status: 400,
      error: 'Bad Request',
    })
  }

  const tutorExists = await Tutor.findOne({ where: { id: TutorId } })
  if (!tutorExists) {
    return res.status(404).json({
      message: 'Tutor not found!',
      status: 404,
      error: 'Not Found',
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

  await CreatePetService.CreateTutorService(
    name,
    species,
    carry,
    weight,
    date_of_birth,
    TutorId
  )

  return res.status(201).json({
    message: 'Pet successfully registered.',
    status: 201,
    info: 'Created',
  })
}

module.exports.updatePet = async (req, res, next) => {
  const TutorId = req.params.tutorId
  const petId = req.params.petId
  const name = req.body.name
  const species = req.body.species
  const carry = req.body.carry
  const weight = req.body.weight
  const date_of_birth = req.body.date_of_birth

  if (!TutorId || !name || !species || !carry || !weight || !date_of_birth) {
    return res.status(400).json({
      message: 'Input fields is empty!',
      status: 400,
      error: 'Bad Request',
    })
  }

  const tutorExists = await Tutor.findOne({ where: { id: TutorId } })
  if (!tutorExists) {
    return res.status(404).json({
      message: 'Tutor not found!',
      status: 404,
      error: 'Not Found',
    })
  }

  const petExists = await Pet.findOne({ where: { id: petId } })
  if (!petExists) {
    return res.status(404).json({
      message: 'Pet not found!',
      status: 404,
      error: 'Not Found',
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

  await UpdatePetService.UpdatePetService(
    name,
    species,
    carry,
    weight,
    date_of_birth,
    TutorId,
    petId
  )

  return res.status(201).json({
    message: 'Pet successfully updated.',
    status: 201,
    info: 'Created',
  })
}

module.exports.deletePet = async (req, res, next) => {
  const petId = Number(req.params.petId)
  const tutorId = Number(req.params.tutorId)

  const tutorExists = await Tutor.findOne({ where: { id: tutorId } })
  if (!tutorExists) {
    return res.status(404).json({
      message: 'Tutor not found!',
      status: 404,
      error: 'Not Found',
    })
  }

  const petExists = await Pet.findOne({ where: { id: petId } })
  if (!petExists) {
    return res.status(404).json({
      message: 'Pet not found!',
      status: 404,
      error: 'Not Found',
    })
  }

  await DeletePetService.DeletePetService(petId, tutorId)
  return res.status(204).json()
}
