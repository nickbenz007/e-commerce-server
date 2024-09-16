import { Request, Response } from 'express'
import { IUser, userModel } from '../model/userModel'
import { UserErrors } from '../errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body
        const user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).json({ type: UserErrors.USER_ALREADY_EXIST })
        }

        if (!isValidEmail(email)) {
            return res
                .status(400)
                .json({ type: UserErrors.INVALID_EMAIL_FORMAT })
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ type: UserErrors.INVALID_PASSWORD_LENGTH })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            email,
            username,
            password: hashedPassword,
        })
        await newUser.save()

        return res.status(200).json({ user: newUser })
    } catch (error) {
        return res.status(500).json({ type: error })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body

        const user: IUser = await userModel.findOne({ username })

        if (!user) {
            return res.status(404).json({ type: UserErrors.NO_USER_FOUND })
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ type: UserErrors.INVALID_PASSWORD_LENGTH })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS })
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRECT_TOKEN)

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                availableMoney: user.availableMoney,
            },
        })
    } catch (error) {
        return res.status(500).json({ type: error })
    }
}
