import React from 'react'
import {CardBody,CardTitle,CardText} from 'reactstrap';
const FlowConditionsAfterAStepResults = ({Data}) => {
    console.log("dATA",Data)
  return (
    <div className="my-2 mx-2 card" inverse color="info"
          style={{width: '20rem',backgroundColor: '#cfe2ff'}}>
        <CardBody>
            <CardTitle tag="h3">Rusultados</CardTitle>
                <h6>Propiedades del flujo después del resalto: </h6>
                <ul>
                  <li><strong> {`y2 = ${Data.y2} m`}</strong></li>
                  <li><strong> {`v2 = ${Data.v2} m/s`}</strong></li>
                  <li><strong> {`E2 = ${Data.E2} m/s`}</strong></li>
                  </ul>
                  <h6>Características del flujo: </h6>
                  <ul>            
                      <li>{`F = ${Data.F} `}</li>
                      <li>{Data.flowType}</li>  
                  </ul>
          </CardBody>
        </div>
  )
}

export default FlowConditionsAfterAStepResults