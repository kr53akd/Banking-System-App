const mongoose =  require("mongoose");
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://abhi53:abhi53@cluster0.uee017y.mongodb.net/BankingSystem').then(()=>{
    console.log(`Connection is successful`)
}).catch((err)=>{
    console.log(`Error is : ${err}`);
})