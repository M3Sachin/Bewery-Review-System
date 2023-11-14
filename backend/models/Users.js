const mongoose=require('mongoose')
const { Schema }=mongoose;
const UserSchema=new Schema({
name:{
    type:String,
    required:true
},
mobile:{
    type:Number,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
date:{
    type:String,
    default:Date
}
});
const Users=mongoose.model('users',UserSchema);
//Users.createIndexes();
module.exports=Users;