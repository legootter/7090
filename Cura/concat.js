import fs from "fs";
let infills=fs.readdirSync("./output");
let plots={};

for(const infill of infills){
    let walls=fs.readdirSync(`./output/${infill}`)
    plots[infill]={}
    for(const wall of walls){
        plots[infill][wall]={hole:[],infill:[],length:[]}
        let holes=fs.readdirSync(`./output/${infill}/${wall}`)
        for(const hole of holes){
            if(!plots[infill][wall]["hole"].includes(hole))plots[infill][wall]["hole"].push(hole)
            let files=fs.readdirSync(`./output/${infill}/${wall}/${hole}`)
            for(const file of files){
                let infillDensity=file.match(/infillDensity=[0-9]*/)[0].split("=")[1]
                if(!plots[infill][wall]["infill"].includes(infillDensity))plots[infill][wall]["infill"].push(infillDensity)
                let data=fs.readFileSync(`./output/${infill}/${wall}/${hole}/${file}`)
                plots[infill][wall]["length"].push(data.toString())
            }
            plots[infill][wall]["length"].push(";")
        }
    }
    break
}

for(const infill in plots){
    console.log(infill)
    for(const wall in plots[infill]){
        console.log(wall)
        plots[infill][wall]["hole"]="["+plots[infill][wall]["hole"].toString()+"]"
        plots[infill][wall]["infill"]="["+plots[infill][wall]["infill"].toString()+"]"
        plots[infill][wall]["length"]="["+plots[infill][wall]["length"].toString()+"]"
        fs.writeFileSync(`results/${wall}${infill}.m`,`A=${plots[infill][wall]["hole"]};\nB=${plots[infill][wall]["infill"]};\nC=${plots[infill][wall]["length"]};\nsurc(B,A,C)`)
    }
}