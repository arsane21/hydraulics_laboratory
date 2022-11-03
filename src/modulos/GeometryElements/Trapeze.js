export const AreaTrapeze = (b,y,m1,m2) =>{
    return b*y + (1/2)*y*y*(m1+m2)
}

export const WettedPerimeterTrapeze = (b,y,m1,m2) =>{
    return y*(Math.sqrt(m1*m1 + 1)+ Math.sqrt(m2*m2 + 1)) + b
}

export const HydraulicRadiusTrapeze =(b,y,m1,m2)=>{
    return AreaTrapeze(b,y,m1,m2)/WettedPerimeterTrapeze(b,y,m1,m2);
}

export const surfaceWidthTrapeze = (b,y,m1,m2) =>{
    return m1*y + m2*y + b;
}

export const HydraulicDepthTrapeze = (b,y,m1,m2) =>{
    return AreaTrapeze(b,y,m1,m2)/surfaceWidthTrapeze(b,y,m1,m2);
}