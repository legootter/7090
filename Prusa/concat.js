import fs from "fs";
//TODO add filtering to all fs.readdirsyncs
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
}

for(const infill in plots){
    console.log(infill)
    for(const wall in plots[infill]){
        console.log(wall)
        plots[infill][wall]["hole"]="["+plots[infill][wall]["hole"].toString()+"]"
        plots[infill][wall]["infill"]="["+plots[infill][wall]["infill"].toString()+"]"
        plots[infill][wall]["length"]="["+plots[infill][wall]["length"].toString()+"]"
        fs.writeFileSync(`results/${wall}${infill}.m`,`A=${plots[infill][wall]["hole"]};\nB=${plots[infill][wall]["infill"]};\nC=${plots[infill][wall]["length"]};\nsurf(B,A,C)`)
    }
    fs.writeFileSync(`results/${infill}.m`,`A=${plots[infill]["2"]["hole"]};\nB=${plots[infill]["2"]["infill"]};\nC=${plots[infill]["2"]["length"]};\nsurf(B,A,C)\nhold on;\nD=${plots[infill]["3"]["hole"]};\nE=${plots[infill]["3"]["infill"]};\nF=${plots[infill]["3"]["length"]};\nsurf(E,D,F)`)
}

//Scatter plot 1
let s1y=[]
for(let i=90;i<3800;i++){
    if(i%100==0){
        s1y.push(plots["cubic"]["3"]["length"].replaceAll(";,","").split(",")[i-90])
    }
}
let s1x=plots["cubic"]["3"]["hole"]
fs.writeFileSync("results/scatter1.m",`X=${s1x};\nY=[${String(s1y)}]\nplot(X,Y)\ntitle("scatter1")`)

//Scatter Plot 2
let s2y1=[];
let s2y2=[];
let s2y3=[];
for(let i=90;i<3800;i++){
    if(i%100==0){
        s2y1.push(plots["cubic"]["3"]["length"].replaceAll(";,","").split(",")[i-90])
        s2y2.push(plots["gyroid"]["3"]["length"].replaceAll(";,","").split(",")[i-90])
        s2y3.push(plots["stars"]["3"]["length"].replaceAll(";,","").split(",")[i-90])
    }
}
let s2x=plots["cubic"]["3"]["hole"]
fs.writeFileSync("results/scatter2.m",`X=${s2x};\nY1=[${String(s2y1)}]\nY2=[${String(s2y2)}]\nY3=[${String(s2y3)}]\nplot(X,Y1,X,Y2,X,Y3)\ntitle("scatter2")`)


//Scatter Plot 3
let s3y1=[];
let s3y2=[];
for(let i=90;i<3800;i++){
    if(i%100==0){
        s3y1.push(plots["cubic"]["2"]["length"].replaceAll(";,","").split(",")[i-90])
        s3y2.push(plots["cubic"]["3"]["length"].replaceAll(";,","").split(",")[i-90])
    }
}
let s3x=plots["cubic"]["3"]["hole"]
fs.writeFileSync("results/scatter3.m",`X=${s3x};\nY1=[${String(s3y1)}]\nY2=[${String(s3y2)}]\nplot(X,Y1,X,Y2)\ntitle("scatter3")`)

//Scatter Plot 4
let s4y1=[];
let s4y2=[];
let s4y3=[];
for(let i=1990;i<2090;i++){
        s4y1.push(plots["cubic"]["3"]["length"].replaceAll(";,","").split(",")[i-90])
        s4y2.push(plots["gyroid"]["3"]["length"].replaceAll(";,","").split(",")[i-90])
        s4y3.push(plots["stars"]["3"]["length"].replaceAll(";,","").split(",")[i-90])

}
let s4x=plots["cubic"]["3"]["infill"]
fs.writeFileSync("results/scatter4.m",`X=${s4x};\nY1=[${String(s4y1)}]\nY2=[${String(s4y2)}]\nY3=[${String(s4y3)}]\nplot(X,Y1,X,Y2,X,Y3)\ntitle("scatter4")`)