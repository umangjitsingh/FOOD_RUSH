import mongoose from "mongoose";

const mongoDb_url=process.env.MONGODB_URL;
console.log(mongoDb_url);
if(!mongoDb_url){
    throw new Error("MongoDB is missing");
}

if(!global.box){
     global.box={
        conn:null,
        promise:null
    }
}


const connectDb=async()=>{
    if(global.box.conn){
        console.log("Connecting to DB from box");
        return global.box.conn
    }
    if(!global.box.promise){
        global.box.promise= mongoose.connect(mongoDb_url).then((result)=>result);
    }
    try{
       global.box.conn =await global.box.promise;
        console.log("Connected to DB (new connection)");
        return global.box.conn;
    }catch(e:any){
        console.error(e);
        throw new Error("MongoDB not connecting but url is present",e);
    }
}
export default connectDb;