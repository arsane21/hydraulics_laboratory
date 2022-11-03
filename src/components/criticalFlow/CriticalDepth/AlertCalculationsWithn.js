import React from 'react';
import {Alert} from 'reactstrap'; 

const AlertCalculationsWithn = () => {
  return (
    <Alert color="info" className='m-0 mt-1'>
        El valor de <strong>n</strong> no es necesario para calcular <strong>yc</strong>, 
        si éste es ingresado se mostrará en los resultados
        además del valor de <strong>yc</strong> el valor de <strong>Sc</strong>.
    </Alert>
  )
}

export default AlertCalculationsWithn;