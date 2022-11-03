export const AreaCircle = (O,d) =>{
    // console.log("O",O);
    // console.log("d",d);
    return ((d**2 / 8)*(O - Math.sin(O)));
}

export const WettedPerimeterCircle = (O,d) =>{
    return ((1/2)*O*d);
}

export const HydraulicRadiusCircle =(O,d)=>{
    return AreaCircle(O,d) /WettedPerimeterCircle(O,d) ;
}

export const surfaceWidthCircle = (O,d) =>{
    return d*Math.sin(O/2);
}

export const HydraulicDepthCircle = (O,d) =>{
    return AreaCircle(O,d)/surfaceWidthCircle(O,d);
}