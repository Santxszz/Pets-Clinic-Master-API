const dayjs = require('dayjs')

const Tutor = require('../../database/models/Tutor')
const Pet = require('../../database/models/Pet')

const CreateTutorService = require('../../services/Tutor/CreateTutorService')
const ListTutorsService = require('../../services/Tutor/ListTutorsService')
const UpdateTutorService = require('../../services/Tutor/UpdateTutorService')
const DeleteTutorService = require('../../services/Tutor/DeleteTutorService')

const emailValidation = require('../../utils/validations/emailValidation')
const nameValidation = require('../../utils/validations/nameValidation')
const formatDate = require('../../utils/formatters/formatedDate')

module.exports.listTutors = async (req, res, next) => {
  const listTutors = await ListTutorsService.ListTutorsService();
if (listTutors.length <= 0) {
  return res.status(404).json({
    message: 'Tutors is not found.',
    status: 404,
    error: 'Not found.',
  });
}

// Função para formatar uma data no padrão "YYYY-MM-DD HH:mm"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// Mapear tutores e formatar data de nascimento e a dos pets
const formattedTutors = listTutors.map(tutor => {
  const formattedPets = tutor.Pets.map(pet => ({
    ...JSON.parse(JSON.stringify(pet)),
    date_of_birth: formatDate(pet.date_of_birth),
  }));

  return {
    ...JSON.parse(JSON.stringify(tutor)),
    date_of_birth: formatDate(tutor.date_of_birth), // Formatar data do tutor
    Pets: formattedPets, // Adicionar pets com datas formatadas
  };
});

return res.status(200).json(formattedTutors);

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

  const tutorCreated = await CreateTutorService.CreateTutorService(
    name,
    phone,
    email,
    date_of_birth,
    zip_code
  )

  const objectResponse = {
    tutorId: tutorCreated.id,
    name: tutorCreated.name,
    phone: tutorCreated.phone,
    email: tutorCreated.email,
    date_of_birth: await formatDate(tutorCreated.date_of_birth),
    zip_code: tutorCreated.zip_code,
  }

  return res.status(201).json({
    tutorInfo: objectResponse,
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

  const updatedTutor = await UpdateTutorService.UpdateTutorService(
    name,
    phone,
    email,
    date_of_birth,
    zip_code,
    id
  )

  const objectResponse = {
    tutorId: id,
    name,
    phone,
    email,
    date_of_birth: dayjs(date_of_birth).format('YYYY-MM-DD HH:mm'),
    zip_code,
  }

  return res.status(201).json({
    tutorInfo: objectResponse,
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
