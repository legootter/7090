import child from "node:child_process"
import fs from"fs"
let infills=fs.readdirSync("./outputraw",)
let stls=fs.readdirSync("../objects",)
let t=0
let plaUUid="506c9f0d-e3aa-4bd4-b2d2-23e2425b1aa9"
let dir="C:\\dev\\School\\MEGR7090/Cura"

//CHANGE LAYER HEIGHTN IN PRUSA_I3.DEF.JSON

//todo make file name fit format `infillType=${infill}&holeSize=${stl.spit(".")[0]&wallCount=${count}&infillDensity=${i}.txt}
//to get "data" fro this^ fs.readditsync() for each file file.match(/infillType=[a-zA-Z]*/)[0].split("=")[1] for infill type

for(const infill of infills){//infill type
    for(let w=2;w<3;w+=1){//wall count
        for(const stl of stls){//object files
            for(let i=0;i<40;i+=1){//infill
                let infillden=densityCalculator(infill,i)
                let command=`CuraEngine slice -v -p -j "${dir}\\defs\\prusa_i3.def.json" -s wall_line_count=${w} -s material_guid=${plaUUid} -s infill_pattern=${infill} -s infill_line_distance=${infillden} -l "C:\\dev\\School\\MEGR7090\\objects\\${stl}" 2>"${dir}\\outputraw\\${infill}\\infillType=${infill}&holeSize=${stl.split(".")[0]}&wallCount=${w}&infillDensity=${i}.txt"`
                setTimeout(()=>{
                    child.exec(command,{cwd:"C:\\Program Files\\Ultimaker Cura 4.13.1"},(error)=>{
                        if(error)console.log(error)
                    })
                },t*200)
                t+=1
            }
        }
    }
}
        

/**
 * @param {String} infillType The type of infill
 * @param {Number} infillDensity 
 * @returns {Number} Calculated infill_line_distance value to plug into Cura engine
 */
function densityCalculator(infillType,infillDensity){
    let value;
    switch(infillType){
        case "gyroid":
            value=((0.4*100)/(infillDensity))*1;
            break;
        case "cubic":
            value=((0.4*100)/(infillDensity))*3;
            break;
        case "trihexagon":
            value=((0.4*100)/(infillDensity))*3;
            break;
        default:
            value=((0.4*100)/(infillDensity))*1;
    }
    return value
}