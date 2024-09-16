import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import mongoose from 'mongoose'
import { userRouter } from './routes/userRoutes'
import { productsRouter } from './routes/productsRoutes'

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3001
const db = process.env.ECOMMERCE_WEB

app.get('/ping', (req: Request, res: Response) => {
    res.send('Welcome to E-Commerce Web')
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productsRouter)

mongoose
    .connect(db)
    .then(() =>
        console.log(colors.bgYellow('Database connected successfully.!').bold)
    )

app.listen(port, () => {
    console.log(
        colors.bgMagenta(`Server is Up & Running at Port: ${port}`).bold
    )
})
