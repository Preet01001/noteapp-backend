//modules
const express = require("express");
const cors = require("cors");
const app = express();

////////------middlewares-------//////////////
app.use(cors());
app.use(express.json());

///////////------internal files-------///////////
require("./dbconn")
const model = require("./usersc");
const modelnote = require("./notesc");

/////////////////////------api's--------////////////////////////////////////////

/////////////////-------authentication--------///////////////////////////
app.post("/signup",async(req,resp)=>{
     let data = req.body;
     let check = await model.findOne({username:data.username});
     if(check){
        resp.send({status:"userhai"})
     }else{
     let user = new model(data);
     await user.save();
     resp.send(data)
     }
})

app.post("/signin",async(req,resp)=>{
    let data = req.body;
    let check = await model.findOne({username:data.username,password:data.password});
    if(check){
       resp.send(data)
    }else{
    resp.send({status:"user-nhi-hai"})
    }
})

///////////----------notes api's---------//////////////

app.get("/",async(req,resp)=>{
    let data = await model.find();
    resp.send(data)
    console.log(data)
})
///////---save note api---////////
app.post("/savenote",(req,resp)=>{
    let data= req.body;
    let note = new modelnote(data);
    note.save();
})


///////---get note api---////////
app.post("/getnote",async(req,resp)=>{
    let username= req.body.username;
    let note = await modelnote.find({username:username});
    resp.send(note)
})

app.delete("/deletenote/:id",async(req,resp)=>{
   
    const result =await modelnote.deleteOne({_id:req.params.id});
    resp.send(result);
})


//port
app.listen(4100,()=>{
    console.log("server started")
})
