import mongoose,{Document} from "mongoose";

interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role?: string;

}

const userSchema= new mongoose.Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    role:{type:String,
        enum:["user","delivery_boy"],
        default:"user"},
},{timestamps:true});

const User=mongoose.models.User || mongoose.model("User",userSchema);
export default User;