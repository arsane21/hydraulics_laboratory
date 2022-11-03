
    const bisection = (f,y0,y1,tol)=> {
        let fy0 = f(y0);
        let fy1 = f(y1);

        if (fy0*fy1 > 0){
            console.log("no se puede usar bisección");
            return {"y0":y0,"fy0":fy0,"y1":y1,"fy1":fy1,"failed":true};
        }else{
            // console.log("fy0",fy0);
            // console.log("fy1",fy1);
            let ym = y0 + (y1-y0)/2;
            let fym = f(ym);
            // console.log("fym",fym);
            let i = 1;
            let data = [];
            data.push({"i":i,"y0":y0,"fy0":fy0,"y1":y1,"fy1":fy1,"ym":ym,"fym":fym});
            while ( Math.abs(fym) >= tol){
                if (fym*fy0 > 0){
                    // console.log("cambia left");
                    y0 = ym;
                    fy0 = fym;
                    ym = y0 + (y1-y0)/2;
                    fym = f(ym);
                    i++;
                    data.push({"i":i,"y0":y0,"fy0":fy0,"y1":y1,"fy1":fy1,"ym":ym,"fym":fym});
                }else{
                    // console.log("cambia right");
                    y1 = ym;
                    fy1 = fym;
                    ym = y0 + (y1-y0)/2;
                    fym = f(ym);
                    i++;
                    data.push({"i":i,"y0":y0,"fy0":fy0,"y1":y1,"fy1":fy1,"ym":ym,"fym":fym});
                }
            }
            // console.log("ym", ym);
            return {"y":ym,"numberIterations":i, "data": data,"failed":false}
        }
    }

export default bisection;