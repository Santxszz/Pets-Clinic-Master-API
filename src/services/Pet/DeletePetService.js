const Pet = require('../../database/models/Pet')
const Tutor = require('../../database/models/Tutor')

exports.DeletePetService = async (petId, tutorId) => {
  try {
    await Pet.destroy({ where: { id: petId, TutorId: tutorId } })
      .then(async () => {
        return
      })
      .catch(err => {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }
}
