    const NewValue = (f,y0,y1)=>{ 
        return y0 - ((y1 - y0)/(f(y1) - f(y0)))*f(y0) 
    };

    const secant = (f,y0,y1,tol)=> {
        console.log(y0);
        console.log(y1);
        let fy0 = f(y0);
        let fy1 = f(y1);
        let y2 = NewValue(f,y0,y1);
        let fy2 = f(y2);
        let relError = Math.abs(fy2-fy1);
        let i = 0;
        let data = [];

        data.push({"i":i,"y0":y0,"fy0":fy0,"y1":y1,"fy1":fy1,"y2":y2,"fy2":fy2, "relError":relError});

        while ( Math.abs(fy2) >= tol){
            y0 = y1;
            y1 = y2;
            y2 = NewValue(f,y0,y1);
            fy2 = f(y2);
            relError = Math.abs(fy2-fy1);
            i++
            data.push({"i":i,"y0":y0,"fy0":fy0,"y1":y1,"fy1":fy1,"y2":y2,"fy2":fy2, "relError":relError});
            if (i > 9999 || Math.abs(f(y1) - f(y0))<= 0.0000000001){
                console.log("max ite")
                console.log("div", Math.abs(f(y1) - f(y0)))
                return false;
            }
        }
        return {"y":y2,"numberIterations":i,"data":data};
            
        }

export default secant;