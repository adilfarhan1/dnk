import express from 'express'
import { checkToken } from '../utils/checkAuth.js'
import { deleteTeam, getTeam, teamCreate, updateTeam } from '../controllers/team.js'


const router = express.Router()

router.post('/add-team', checkToken, teamCreate)
router.put('/updateteam/:id', checkToken, updateTeam)
router.get('/get-team', checkToken, getTeam)
router.delete('/delete-team/:id', deleteTeam)

export default router;