import { Schema, model } from 'mongoose'

export interface IUser {
    id: string
    email: string
    username: string
    password: string
    availableMoney: number
    // purchasedItems: string
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    availableMoney: {
        type: Number,
        default: 5000,
    },
    //   purchasedItems:
})

export const userModel = model<IUser>('user', userSchema)
