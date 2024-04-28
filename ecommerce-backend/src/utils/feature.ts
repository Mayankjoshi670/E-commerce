// for connecting backed 
import mongoose from 'mongoose';
export const connectDB = ()=>{
mongoose.connect("mongodb://localhost:27017",{
    dbName:"E-commerce"
}).then((c)=> console.log(`DB is connected to ${c.connection.host}`))
.catch((e)=>console.log(e));
};