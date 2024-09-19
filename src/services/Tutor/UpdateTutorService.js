const Pet = require('../../database/models/Pet')
const Tutor = require('../../database/models/Tutor')

exports.UpdateTutorService = async (
  name,
  phone,
  email,
  date_of_birth,
  zip_code,
  id
) => {
  const TutorData = {
    name,
    phone,
    email,
    date_of_birth,
    zip_code,
  }

  try {
    const tutor = await Tutor.update(TutorData, { where: { id } })
    return tutor
  } catch (err) {
    console.log(err)
  }
}
