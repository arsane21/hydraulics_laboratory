
export const FlowType = (Q,A,D) =>{
    const g = 9.80665;
    const F = (Q/A)/ Math.sqrt(g*D);

    if (F>1){
        if ( (F-1)>0.05){
            return {"F":F,"flowType":'Flujo supercritico'}
        }else{
            return {"F":F,"flowType":'Flujo Crítico'}
        }
    }else{
        if ( (F-1)<0.05){
            return {"F":F,"flowType":'Flujo subcritico'}
        }else{
            return {"F":F,"flowType":'Flujo Critico'}
        }
    }
}