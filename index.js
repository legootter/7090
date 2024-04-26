const  { exec } =require("child_process")
const express = require("express")
require('dotenv').config();
process.env.DIRNAME=__dirname
const app=express()
app.listen(1014)

app.all("/",(req,res)=>{
    res.sendFile(`${process.env.DIRNAME}\\index.html`)
})

app.get("/getcuradata",(req,res)=>{
    exec("node getData.js",{cwd:`${process.env.DIRNAME}\\Cura`},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/processcuradata",(req,res)=>{
    exec("node process.js",{cwd:`${process.env.DIRNAME}\\Cura`},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/concatcuradata",(req,res)=>{
    exec("node concat.js",{cwd:`${process.env.DIRNAME}\\Cura`},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/cleanupcuradata",(req,res)=>{
    exec("node cleanup.js",{cwd:`${process.env.DIRNAME}\\Cura`},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/getprusadata",(req,res)=>{
    exec("node getData.js",{cwd:`${process.env.DIRNAME}\\Prusa`},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/processprusadata",(req,res)=>{
    exec("node process.js",{cwd:`${process.env.DIRNAME}\\Prusa`},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/concatprusadata",(req,res)=>{
    exec("node concat.js",{cwd:`${process.env.DIRNAME}\\Prusa`},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/cleanupprusadata",(req,res)=>{
    exec("node cleanup.js",{cwd:`${process.env.DIRNAME}\\Prusa`},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})

//throw exception at startup when .env paths for Cura or Prua are not valid paths
exec("prusa-slicer-console.exe --help-fff",{cwd:process.env.PRUSAPATH},(error,stdout,stderr)=>{
    if(stderr.includes("not recognized as an internal or external command")){
        throw new Error("Prusa path in .env file is not a valid path")
    }
})
exec("CuraEngine --help",{cwd:process.env.CURAPATH},(error,stdout,stderr)=>{
    if(stderr.includes("not recognized as an internal or external command")){
        throw new Error("Cura path in .env file is not a valid path")
    }
})