
// express make it easy to setup server and routing ---it also set the document type html or json automatically
//todo if we give object to res.send then express will convert it to json format we can also use res.json() which also stringify null etc

const express=require('express')
const app=express()
const path=require('path')
const axios=require('axios')
require('dotenv').config()
// const { json } = require('express/lib/response')



console.log(process.env)
// '/' means the root domain
//* response.send close the loading or connection


// app.get('/about',(req,res)=>res.send('<h1>About us</h1>'))

//**serve static files with express.static*/
//**in public folder it serve index.html

// const spath=path.join(__dirname,'public')
// console.log(spath)

// when we do this static then if the requested page is not mentioned like '/' it will look in public folder for file 
// it is also useful because we won't make route for every file
app.use(express.static('public',{extensions:['html']}))
app.use(express.json({limit:'1mb'}))

app.get('/weather/:city', async (req,res)=> {
    // console.log(req.params)
  const city=req.params.city
  const resp=await axios({
    method:'get',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
})
     res.send(resp.data)
    })

const port=process.env.port||5000
app.listen(port,()=>console.log('listening....'))