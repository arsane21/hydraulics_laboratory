
const fixedPoint = (f,y0,tol)=> {
    let fy0 = f(y0);
    let y1 = fy0;
    let relError = Math.abs(y1-y0);

    let i = 1;
    let data = [];

    data.push({"i":i,"y0":y0,"fy0":fy0,"y1":y1,"relError":relError});

    while ( relError >= tol){
        y0 = y1;
        fy0 = f(y0);
        y1 = fy0;
        relError = Math.abs(y1-y0);
        i++
        data.push({"i":i,"y0":y0,"fy0":fy0,"y1":y1,"relError":relError});

        if (i > 9999){
            console.log("max ite")
            return {"data":data};
        }
    }
    return {"y":y1,"numberIterations":i,"data":data};
        
    }

export default fixedPoint;