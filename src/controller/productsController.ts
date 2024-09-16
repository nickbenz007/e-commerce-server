import { Request, Response } from 'express'
import { ProductsModel } from '../model/productsModel'

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductsModel.find({})
        res.status(200).json({ message: 'All Products', products })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await ProductsModel.findById(req.params.id)
        if (!product) {
            res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ message: 'All Products', product })
    } catch (error) {
        res.status(500).json({ message: error.mesesage })
    }
}

export const updateLikes = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await ProductsModel.findById(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        if (product.likes === 0) {
            product.likes += 1
        } else {
            product.likes -= 1
        }
        await product.save()

        res.status(200).json({
            message: 'Product status updated successfully',
            likes: product.likes,
        })
    } catch (error) {
        res.status(500).json({ message: error.maessage })
    }
}

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { productName, price, description, imageUrl, stockQuantity } =
            req.body

        const newProduct = new ProductsModel({
            productName,
            price,
            description,
            imageUrl,
            stockQuantity,
        })

        await newProduct.save()

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Server Error:',
            errMsg: error,
        })
    }
}
