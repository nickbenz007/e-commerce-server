import { Router } from 'express'
import {
    getAllProducts,
    addProduct,
    getProductById,
    updateLikes,
} from '../controller/productsController'
import { authMiddleware } from '../middleware'

const productsRouter = Router()

productsRouter.get('/get-all-products', getAllProducts)
productsRouter.get('/product/:id', getProductById)
productsRouter.patch('/product/:id/like', authMiddleware, updateLikes)
productsRouter.post('/add-product', addProduct)

export { productsRouter }
