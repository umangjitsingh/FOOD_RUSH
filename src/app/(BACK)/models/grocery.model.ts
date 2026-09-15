import mongoose from "mongoose";


export interface IGrocery extends Document {
    _id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: number;
    unit: string;
    quantity: number;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const grocerySchema = new mongoose.Schema<IGrocery>({
    name: {type: String, required: true},
    category: {type: String, enum:["Salads", "Indian",  "Hakka-Chinese", "Pizza & Pasta", "Snacks & Biscuits", "Desserts","Beverages", "Other"]},
    price: {type: Number, required: true},
    unit: {type: String, required: true},
    quantity: {type: Number, required: true},
    image: {type: String,}
}, {timestamps: true})

const GroceryModel = mongoose.models.Grocery || mongoose.model("Grocery", grocerySchema);

export default GroceryModel;
