const Pet = require('../../database/models/Pet')
const Tutor = require('../../database/models/Tutor')

exports.DeleteTutorService = async id => {
  try {
    // await Pet.destroy({ where: { TutorId: id } })
    await Tutor.destroy({ where: { id: id } })
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
