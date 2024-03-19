const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://trungnhan1401:concac123@cluster0.oepgm9y.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    topic: { type: String, default: 'iot' },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gmail:{
        type:String,
        required:true
    },
    admin: { type: Boolean, default: false }
})

const user = new mongoose.model('user',logInSchema)
module.exports = user