const express =  require('express');
const router = express.Router();
const {Users, Transection} = require('./Database/UserSchema');

router.get('/viewall',async(req, res)=>{
   try{
    let data;
    data = await Users.find();  
    if(!data){
      throw new Error('No data found');
    }
    res.json(data);
   }catch(err){
      console.log(err);
   }
})

router.get('/single/:id',async(req,res)=>{
   try{
      const id = req.params.id
      const singleData =await Users.findOne({_id:id});
      if(!singleData)
       throw new Error('No data found');
      res.json(singleData);
   }catch(err){
      console.log(err);
   }

})
 
router.post("/adduser", async(req, res)=>{
    //object destructing
 const user_id = req.body;
 const userExist = await Transection.findOne({user_id:user_id});
 if(userExist)
   return res.status(422).json({Message: 'User already exist'});
   try{
      const data = await Transection(user_id);
      if(data)
       return res.status(200).json({Message:'Data stored Successfully'});
   }catch(error){
    console.log(error);
   }

})

router.get('/transection/:id',async (req,res)=>{
   try{
      const find_id = req.params.id
      const transection = await Transection.findOne({user_id:find_id});
      if(!transection)
       {
         return res.json("no data")
       }
       res.json(transection.transections)
      }catch(error){
         console.log(err);
      }
})

router.post('/send/:id',async (req,res)=>{
   try{
   const send_id = req.params.id;
   const {from,to,date,time,status,amount,current} = req.body;
   const senderDetails = await Transection.findOne({user_id:send_id});
   if(senderDetails){
      senderDetails.transections=senderDetails.transections.concat({from,to,time,date,amount,current,status})
    await senderDetails.save();
   }
   else{
      const senderDetails = await Transection({user_id:send_id,transections:{from,to,time,date,amount,current,status}})
      await senderDetails.save();
   }
   const updateBalance = await Users.findOne({_id:send_id});
   updateBalance.balance = current;
   await updateBalance.save();
   res.status(200);
}catch(error){
   console.log(error);
}
})

router.post('/reciever/:id',async(req, res)=>{
  try{
   const reciever_id = req.params.id;
   const {from,to,date,time,status,amount,current} = req.body;
   const received = await Transection.findOne({user_id:reciever_id});
   if(received){
      received.transections=received.transections.concat({from,to,time,date,amount,current,status})
    await received.save();
   }
   else{
      const received = await Transection({user_id:reciever_id,transections:{from,to,time,date,amount,current,status}})
      await received.save();
   }
   const updateBalance = await Users.findOne({_id:reciever_id});
   updateBalance.balance = current;
   await updateBalance.save();
 res.status(200).json("Money sent successfully");
}catch(error){ 
   console.log(error)
}
});

module.exports = router