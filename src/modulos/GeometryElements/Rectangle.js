export const AreaRectangle = (b,y) =>{
    return b*y;
}

export const WettedPerimeterRectangle = (b,y) =>{
    b = Number(b);
    y = Number(y);
    return y*2 + b;
}

export const HydraulicRadiusRectangle =(b,y)=>{
    return AreaRectangle(b,y)/WettedPerimeterRectangle(b,y);
}

export const surfaceWidthRectangle = (b) =>{
    return b;
}

export const HydraulicDepthRectangle = (b,y) =>{
    return AreaRectangle(b,y)/surfaceWidthRectangle(b);
}