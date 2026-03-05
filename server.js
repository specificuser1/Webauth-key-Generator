require("dotenv").config()

const express = require("express")
const axios = require("axios")
const app = express()

const cooldown = {}

app.use(express.static("public"))

app.get("/generate", async (req,res)=>{

let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress

if(cooldown[ip] && Date.now() < cooldown[ip]){
let time = Math.ceil((cooldown[ip]-Date.now())/1000/60)
return res.json({error:`Wait ${time} minutes`})
}

try{

const axios = require("axios")

let response = await axios.post("https://keyauth.win/api/1.2/",{
type:"license",
ownerid:process.env.OWNER_ID,
name:process.env.APP_NAME,
secret:process.env.SECRET,
duration:6
})

let key = response.data.license

cooldown[ip] = Date.now() + 6*60*60*1000

res.json({key:key})

}catch{
res.json({error:"Key generation failed"})
}

})

app.listen(3000,()=>{
console.log("Server running")
})
