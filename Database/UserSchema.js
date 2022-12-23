const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    balance:{type:Number, required:true}
});

const transectionSchema = new mongoose.Schema({
    user_id:{type:String, required:true},
    transections:[{
    from : {type:String, required:true},
    to:{type:String, required:true},
    date:{type:String, required:true},
    time:{type:String, required:true},
    status:{type:String, required: true},
    amount:{type:Number, required:true},
    current : {type:Number, required:true}
}]
})

const Users = mongoose.model('Users',userSchema);
const Transection = mongoose.model('Transection',transectionSchema);

module.exports = {Users, Transection};