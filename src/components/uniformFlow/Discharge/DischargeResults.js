import React from 'react'
import {CardBody,CardTitle,CardText} from 'reactstrap';
const DischargeResults = ({Data}) => {
    return (
        <div className="my-2 mx-2 card" inverse color="info"
          style={{width: '20rem',backgroundColor: '#cfe2ff'}}>
          <CardBody>
              <CardTitle tag="h3">Rusultados</CardTitle>
              <CardText>
                  <ul>
                    {Data.Tetha?<li><strong><span>&#952;</span>{` = ${Data.Tetha} rad`}</strong></li>:null}
                    <li><strong> {`Q = ${Data.Q} m^3/S`}</strong></li>
                    {Data.numberIterations?<li><strong> {`Iteraciones = ${Data.numberIterations}`}</strong></li>:null}
                    <li><strong> {`V = ${Data.V} m/s`}</strong></li>
                  </ul>
                  <h6>Características del flujo </h6>
                  <ul>            
                      <li>{`F = ${Data.F} `}</li>
                      <li>{Data.flowType}</li>  
                  </ul>
              </CardText>
          </CardBody>
        </div>
    )
  }
export default DischargeResults;