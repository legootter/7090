//https://manual.slic3r.org/advanced/command-line

import child from "node:child_process"
import fs from"fs"
let infills=fs.readdirSync("./outputraw",)
let stls=fs.readdirSync("../objects",)
let t=0
let dir="C:\\dev\\School\\7090\\Prusa"

let cfiles=fs.readdirSync(`outputraw/cubic`,{recursive:true})
let gfiles=fs.readdirSync(`outputraw/gyroid`,{recursive:true})
let sfiles=fs.readdirSync(`outputraw/stars`,{recursive:true})
let files=cfiles.concat(gfiles).concat(sfiles)
console.log(files)
console.log(files.length)



for(const infill of infills){//infill type
    for(let w=2;w<4;w+=1){//wall count
        for(const stl of stls){//object files
            for(let i=0;i<100;i+=1){//infill
                if(files.includes(`infillType=${infill}&holeSize=${stl.split(".")[0]}&wallCount=${w}&infillDensity=${i}.txt`))continue
                setTimeout(()=>{
                    let density=i
                    if(String(density).length==1)density=`0${density}`
                    let command=`prusa-slicer-console.exe --load ${dir}\\PrusaSlicer_config_bundle.ini --gcode-flavor marlin --filament-density 1.24 --fill-pattern ${infill} --perimeters ${w} --solid-infill-below-area 0 --fill-density .${density} -g C:\\dev\\School\\7090\\objects\\${stl} -o "${dir}\\outputraw\\${infill}\\infillType=${infill}&holeSize=${stl.split(".")[0]}&wallCount=${w}&infillDensity=${i}.txt"`
                    child.exec(command,{cwd:"C:\\Program Files\\Prusa3D\\PrusaSlicer"},(error,sout,serr)=>{
                        if(error)console.log(error)
                        //if(sout)console.log(sout)
                        if(serr)console.log(serr)
                    })
                },t*150)
                t+=1
            }
        }
    }
}