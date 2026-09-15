import mongoose,{Document} from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role?: string;
    image?: string;
    mobile?: string;

}

const userSchema= new mongoose.Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    image:{type:String},
    mobile:{type:String},
    role:{type:String,
        enum:["user","delivery_boy","admin"],
        default:"user"},
},{timestamps:true});

const User=mongoose.models.User || mongoose.model("User",userSchema);
export default User;