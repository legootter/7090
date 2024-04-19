import fs from "fs"
let infills=fs.readdirSync("./outputraw")
let i=0
let xs={}
let ys={}
let zs={}
let start= new Date().valueOf()

for(const infill of infills){
    xs[infill]=""
    ys[infill]=""
    zs[infill]=""
    let files=fs.readdirSync(`./output/${infill}`)
    for(const file of files){
        let holeSize=file.match(/holeSize=[0-9]*/)[0].split("=")[1]
        let wallCount=file.match(/wallCount=[0-9]/)[0].split("=")[1]
        let infillDensity=file.match(/infillDensity=[0-9]*/)[0].split("=")[1]
        ys[infill]+=` ${holeSize}`
        xs[infill]+=` ${infillDensity}`
        let data=fs.readFileSync(`./output/${infill}/${file}`)
        zs[infill]+=` ${data}`
        i+=1
        }
    fs.writeFileSync(`results/${infill}.m`,`x=[${JSON.stringify(xs[infill]).replace(`"`,"").replace(`"`,"")}];\ny=[${JSON.stringify(ys[infill]).replace(`"`,"").replace(`"`,"")}];\nz=[${JSON.stringify(zs[infill]).replace(`"`,"").replace(`"`,"")}];\np=5000;\nscatter3(x,y,z,p,z,"filled")`)
}
let end = new Date().valueOf()
console.log(`processing completed in ${end-start} ms, ${i} files were processed`)
//TODO
//Autoformat fs writefile to matlab and save as a .m file