const Pet = require('../../database/models/Pet')
const Tutor = require('../../database/models/Tutor')

exports.CreateTutorService = async (
  name,
  phone,
  email,
  date_of_birth,
  zip_code
) => {
  const TutorData = {
    name,
    phone,
    email,
    date_of_birth,
    zip_code,
  }

  try {
    const tutor = await Tutor.create(TutorData)
    return tutor
  } catch (err) {
    console.log(err)
  }
}
