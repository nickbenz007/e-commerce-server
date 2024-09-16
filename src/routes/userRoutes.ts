import express from 'express'

import { loginUser, registerUser } from '../controller/userController'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

export { userRouter }
