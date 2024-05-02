import mongoose from "mongoose";
import   validator  from "validator";


interface IUser extends Document {
    _id: string;
    name: string;
    photo: string;
    email: string;
    role: "admin"| "user";
    gender: "male"|"female";
    dob: Date ; 
    createdAt: Date;
    updatedAt: Date;

    age : Number; 
//  age is virtual attribute 
}

const schema = new mongoose.Schema({
    _id:{
    type: String  ,
    requied: [true,"Please enter id "]  ,
    } ,
    name : {
        type : String , 
        requied: [true , "please enter name "] , 
    },
    email:{
        type : String , 
        unique : [true , "email already exists"],
        requied: [true , "please enter email "] ,
        //  to validate email either we can make our own function or we can use liberies 
        validator: validator.default.isEmail
    }
    ,
   photo:{
    type:String , 
    requied:[true , "please add Photo"]
   },
   role:{
    type : String , 
    enum : ["admin" , "user"], 
    default : "user",
   },
   gender :{
    type :  String , 
    enums : ["male", "female"],
    requied:[true , "please enter your  gender"]
   },
   dob:{
    type : Date , 
    requied:[true , "please enter your  date of birth"]
   }
}, {
    timestamps: true, 
});
//  we create a virtual schema 
//  virtual schema is a schema which is not stored into the databse they are computed at  time of access 
schema.virtual("age").get(function(){
    const today = new Date();
    const dob:any = this.dob ;
    let age:any = today.getFullYear() - dob.getFullYear() ; 
    if(today.getMonth()< dob.getMonth() || today.getMonth()==dob.getMonth() && today.getDate()< dob.getDate()) {
        age-- ; 
    } 
    return age ; 
})
export const User = mongoose.model<IUser>("User", schema);
