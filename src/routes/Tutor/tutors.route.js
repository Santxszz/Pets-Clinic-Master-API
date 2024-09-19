const { Router } = require('express')

const TutorController = require('../../controllers/Tutor/TutorController')

const tutorsRouter = Router()

tutorsRouter.get('/tutors', TutorController.listTutors)

module.exports = tutorsRouter
