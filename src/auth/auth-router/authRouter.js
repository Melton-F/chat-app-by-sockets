import express  from "express";
import {showUsers, register, validateUser, login,  authPassword} from "../auth-controller/authController"
const router = express.Router()

router.get('/all-users', showUsers)
router.post('/register', register)
router.post('/validate-user', validateUser)
router.post('/login', login)
// router.post('/auth-app', authPassword)

module.exports = router