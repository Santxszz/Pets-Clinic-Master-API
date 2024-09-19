const Pet = require('../../database/models/Pet')
const Tutor = require('../../database/models/Tutor')

exports.UpdatePetService = async (
  name,
  species,
  carry,
  weight,
  date_of_birth,
  TutorId,
  petId
) => {
  const PetData = {
    name,
    species,
    carry,
    weight,
    date_of_birth,
    TutorId,
    petId,
  }

  try {
    const pet = await Pet.update(PetData, { where: { id: petId, TutorId } })
    return pet
  } catch (err) {
    console.log(err)
  }
}
