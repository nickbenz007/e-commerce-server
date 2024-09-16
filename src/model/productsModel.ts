import { Schema, model } from 'mongoose'

export interface IProducts {
    productName: string
    price: number
    description: string
    imageUrl: {
        main: string
        sub_images: string[]
    }
    stockQuantity: number
    likes: number
}

const ProductsSchema = new Schema<IProducts>({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be above $1'],
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        main: {
            type: String,
            required: true,
        },
        sub_images: {
            type: [String],
            required: true,
        },
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must not be lower than 1'],
    },
    likes: {
        type: Number,
        default: 0,
    },
})

export const ProductsModel = model<IProducts>('products', ProductsSchema)
