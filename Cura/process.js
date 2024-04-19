import fs from "fs"
let infills=fs.readdirSync("./outputraw")
let i=0
let start= new Date().valueOf()

for(const infill of infills){
    let files=fs.readdirSync(`./outputraw/${infill}`)
    for(const file of files){
        let holeSize=file.match(/holeSize=[0-9]*/)[0].split("=")[1]
        let wallCount=file.match(/wallCount=[0-9]/)[0].split("=")[1]
        let infillDensity=file.match(/infillDensity=[0-9]*/)[0].split("=")[1]
        if(!fs.existsSync(`./output/${infill}/${wallCount}/${holeSize}`))fs.mkdirSync(`./output/${infill}/${wallCount}/${holeSize}`,{recursive:true})
        let data=fs.readFileSync(`./outputraw/${infill}/${file}`)
        fs.mkdir
        fs.writeFileSync(`./output/${infill}/${wallCount}/${holeSize}/${file}`,data.toString().match(/;Filament used: [0-9\.]*/)[0].split(": ")[1])
        i+=1
    }
}
let end = new Date().valueOf()
console.log(`processing completed in ${end-start} ms, ${i} files were processed`)


/*
Cura
    output
        cubic
            2walls
                holesize
                    "data"
            3walls
                holesize
                    "data"
        gyroidal
            2walls
                holesize
                    "data"
            3walls
                holesize
                    "data"
        gyroidal
            2walls
                holesize
                    "data"
            3walls
                holesize
                    "data"
*/