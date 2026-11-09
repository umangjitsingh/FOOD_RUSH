import mongoose from "mongoose";
import {number} from "motion";

interface IOrder {
    _id?: mongoose.Types.ObjectId,
    user_fk: mongoose.Types.ObjectId,
    items: [
        {
            meal_fk: mongoose.Types.ObjectId,
            quantity: number
        }
    ],
    totalAmount: string,
    paymentMethod: "cod" | "online",
    address: {
        fullName: string,
        city: string,
        state: string,
        pincode: string,
        latitude: number,
        longitude: number,
        fullAddress: string
    },
    status: "pending" | "out for delivery" | "delivered",
    createdAt?: Date,
    updatedAt?: Date
}

const orderSchema = new mongoose.Schema<IOrder>({
    user_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{
        meal_fk: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meal",
            required: true
        }
    }],
    totalAmount: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "online"],
        default: "cod"
    },
    address: {
        fullName: String,
        city: String,
        state: String,
        pincode: String,
        latitude: Number,
        longitude: Number,
        fullAddress: String
    },
    status:{
        type:String,
        enum:["pending" , "out for delivery" , "delivered"],
        default:"pending"
    }
}, {timestamps: true})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;