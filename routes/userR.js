import express from 'express'
import { createUser,} from '../controllers/user.js'
import { login, logout } from '../controllers/auth.js'
import { checkToken } from '../utils/checkAuth.js'


const router = express.Router()

// router.post('/addUser', addUser)
router.post('/reg', createUser)
router.post('/login', login)
router.post('/logout', logout)
// router.delete('/delete-user/:id', deleteUser)
// router.put('/update-user/', checkToken, updateUser)
// router.get('/get-user', checkToken, getUser)
// router.post('/forgotpass', forgotPass)

export default router;