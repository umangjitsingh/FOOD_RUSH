import mongoose from "mongoose";


export interface IMeal extends Document {
    _id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: number;
    size?: "NA" | "Small" | "Medium" | "Large";
    image: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const mealSchema = new mongoose.Schema<IMeal>({
    name: {type: String, required: true},
    category: {type: String, enum:["Salads", "Indian",  "Hakka-Chinese", "Pizza & Pasta", "Snacks & Biscuits", "Desserts","Beverages", "Other"]},
    price: {type: Number, required: true},
    size: {type: String, enum:["NA","Small", "Medium", "Large"],default:"NA"},

    image: {
        type: [String],
        required: true,
        validate: {
            validator: function(v: string[]) {
                return v.length <= 4;
            },
            message: 'Maximum 4 images allowed per meal'
        }
    },
}, {timestamps: true})

const Meal = mongoose.models.Meal || mongoose.model("Meal", mealSchema);

export default Meal;
