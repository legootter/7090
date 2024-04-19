import fs from "fs"
let infills=fs.readdirSync("./outputraw")
let start= new Date().valueOf()
for(const infill of infills){
        let files=fs.readdirSync(`./outputraw/${infill}`)
        for(const file of files){
                fs.rmSync(`./outputraw/${infill}/${file}`,{recursive:true})
        }
        fs.rmSync(`./output/${infill}`,{recursive:true})
}
let end = new Date().valueOf()
console.log(`Cleanup completed in ${end-start} ms`)