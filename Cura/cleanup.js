import fs from "fs"
let infills=fs.readdirSync("./outputraw")
let i=0
let start= new Date().valueOf()
for(const infill of infills){
        fs.rmSync(`./outputraw/${infill}`)
        fs.rmSync(`./output/${infill}`)
}
let end = new Date().valueOf()
console.log(`Cleanup completed in ${end-start} ms, ${i} files were deleted`)