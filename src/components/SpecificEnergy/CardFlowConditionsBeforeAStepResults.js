import React from 'react'
import {CardBody,CardTitle,CardText} from 'reactstrap';
const CardFlowConditionsBeforeAStepResults = ({dataEntered}) => {
    console.log(dataEntered)
  return (
    <div className="my-2 mx-2 card" inverse color="info"
          style={{width: '20rem',backgroundColor: '#cfe2ff'}}>
        <CardBody>
                <h6>Propiedades del flujo antes del escalón: </h6>
                <ul>
                  <li><strong> {`y1 = ${dataEntered.y1} m`}</strong></li>
                  <li><strong> {`v1 = ${dataEntered.v1} m/s`}</strong></li>
                  <li><strong> {`E1 = ${dataEntered.E1} m/s`}</strong></li>
                  </ul>
                  <h6>Características del flujo: </h6>
                  <ul>            
                      <li>{`F = ${dataEntered.F} `}</li>
                      <li>{dataEntered.flowType}</li>  
                  </ul>
          </CardBody>
        </div>
  )
}

export default CardFlowConditionsBeforeAStepResults