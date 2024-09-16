import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeaders = req.headers.authorization
        if (authHeaders) {
            jwt.verify(authHeaders, process.env.SECRECT_TOKEN, (err) => {
                if (err) {
                    return res
                        .send(403)
                        .json({ message: 'Forbidden Invalid token' })
                }
                next()
            })
        }
    } catch (error) {
        res.send(500).json(error)
    }
}
