const Pet = require("../../database/models/Pet");
const Tutor = require("../../database/models/Tutor");

exports.ListTutorsService =  async (req, res, next) => {
    try {
        const Tutors = await Tutor.findAll({ include: Pet });
        return Tutors;
    } catch (err) {
        console.log(err)
    }
}