
export const AreaTriangle = (y,m1,m2)=>{
    return 0.5*y*y*(m1+m2);
}

export const WettedPerimeterTriangle = (y,m1,m2)=>{
    return y*((Math.sqrt(1 + m1*m1))+ Math.sqrt(1 + m2*m2));
}

export const HydraulicRadiusTriangle =(y,m1,m2)=>{
    return AreaTriangle(y,m1,m2)/WettedPerimeterTriangle(y,m1,m2);
}

export const surfaceWidthTriangle = (y,m1,m2) =>{
    return m1*y + m2*y;
}

export const HydraulicDepthTriangle = (y,m1,m2) =>{
    return AreaTriangle(y,m1,m2)/surfaceWidthTriangle(y,m1,m2);
}