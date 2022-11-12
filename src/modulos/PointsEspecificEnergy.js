const E = (v,y)=>{
    return y + (Math.pow(v,2)/(2*9.81));
}

export const PointsEspecificEnergy = (Q,B,y1,E1,y2,E2) =>{
    const yc = ((Q*Q)/(9.81*B*B))**(1/3);
    console.log("yc",yc)
    const Emin = (3/2)*yc;
    console.log("Emin",Emin)
    const points=[];
    let ypoint=0.2;
    while (ypoint<yc) {
        
        const v = Q/(ypoint*B)
        const Epoint = E(v,ypoint+0.1);

        if (Epoint>20){
            continue
        }
        points.unshift({
            // "E":Epoint,
            name:Number(ypoint.toFixed(2)),
            pv:Epoint,
            uv: 4300,
            amt: 2100
            // "y":ypoint
        })
        ypoint = ypoint+0.1;
    }
    // for (let ypoint;i>0;i--){
    //     const ypoint = yc-i*0.1;
    //     const v = Q/(ypoint*B)
    //     const Epoint = E(v,ypoint);
    //     points.push({
    //         // "E":Epoint,
    //         name:ypoint,
    //         pv:Epoint,
    //         uv: 4300,
    //         amt: 2100
    //         // "y":ypoint
    //     })
    // }
    points.unshift({
        name:yc,
        pv:Emin,
        uv: 4300,
        amt: 2100
    //     "E":Emin,
    //     "y":yc
    })

    let n=0;
    let m=0;
    for (let i=1;i<30;i++){
        const ypoint = Number((yc+i*0.1).toFixed(2));
        if (ypoint>y1){
            while (n===0){
                points.unshift({
                    // "E":Epoint,
                    name:y1,
                    pv:E1,
                    uv: 4300,
                    amt: 2100
                    // "y":ypoint
                })
                n++
            } 
        }
        if (ypoint>y2){
            while (m===0){
                points.unshift({
                    // "E":Epoint,
                    name:y2,
                    pv:E2,
                    uv: 4300,
                    amt: 2100
                    // "y":ypoint
                })
                m++
            } 
        }
        const v = Q/(ypoint*B)
        const Epoint = E(v,ypoint);
        points.unshift({
            // "E":Epoint,
            name:ypoint,
            pv:Epoint,
            uv: 4300,
            amt: 2100
            // "y":ypoint
        })
    }

    return points;

}

