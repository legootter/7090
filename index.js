import { exec } from "child_process"
import express from "express"
const app=express()
app.listen(1014)

app.all("/",(req,res)=>{
res.sendFile("C:\\dev\\School\\MEGR7090\\index.html")
})

app.get("/getcuradata",(req,res)=>{
    exec("node getData.js",{cwd:"C:\\dev\\School\\MEGR7090\\Cura"},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/processcuradata",(req,res)=>{
    exec("node process.js",{cwd:"C:\\dev\\School\\MEGR7090\\Cura"},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/concatcuradata",(req,res)=>{
    exec("node concat.js",{cwd:"C:\\dev\\School\\MEGR7090\\Cura"},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/cleanupcuradata",(req,res)=>{
    exec("node cleanup.js",{cwd:"C:\\dev\\School\\MEGR7090\\Cura"},(err,out,serr)=>{
        if(err)console.log(err)
        if(out)console.log(out)
        if(serr)console.log(serr)
    })
    res.redirect("/")
})
app.get("/getprusadata",(req,res)=>{
    res.redirect("/")
})
app.get("/processprusadata",(req,res)=>{
    res.redirect("/")
})
app.get("/concatprusadata",(req,res)=>{
    res.redirect("/")
})
app.get("/cleanupprusadata",(req,res)=>{
    res.redirect("/")
})