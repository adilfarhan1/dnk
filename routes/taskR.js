import express from 'express'
import { getTask, updateTask, taskCreate, deleteTask } from '../controllers/task.js'
import { checkToken } from '../utils/checkAuth.js'

const router = express.Router()

router.post('/add-task', checkToken, taskCreate)
router.put('/updatetask/:id',checkToken, updateTask)
router.get('/get-task', checkToken, getTask)
router.delete('/delete-task/:id', deleteTask)

export default router;