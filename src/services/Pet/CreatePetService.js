const Pet = require('../../database/models/Pet')
const Tutor = require('../../database/models/Tutor')

exports.CreateTutorService = async (
  name,
  species,
  carry,
  weight,
  date_of_birth,
  TutorId
) => {
  const PetData = {
    name,
    species,
    carry,
    weight,
    date_of_birth,
    TutorId,
  }

  try {
    const pet = await Pet.create(PetData)
    return pet
  } catch (err) {
    console.log(err)
  }
}
