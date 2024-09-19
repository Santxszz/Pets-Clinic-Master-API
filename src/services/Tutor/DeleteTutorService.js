const Pet = require('../../database/models/Pet')
const Tutor = require('../../database/models/Tutor')

exports.DeleteTutorService = async id => {
  //   const TutorSearch = await Tutor.findOne({ where: { id: id } })
  //   const PetSearch = await Pet.findOne({ where: { TutorId: id } })

  //   if (!PetSearch && !TutorSearch) {
  //     return res.status(400).json({
  //       message: 'Id provided not exists in database.',
  //       status: 400,
  //       error: 'Bad Request',
  //     })
  //   }

  try {
    await Pet.destroy({ where: { TutorId: id } })
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
