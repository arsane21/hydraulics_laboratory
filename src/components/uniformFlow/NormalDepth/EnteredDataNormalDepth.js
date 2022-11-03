import React from 'react'
import { CardBody,CardTitle,CardText } from 'reactstrap';
const EnteredDataNormalDepth = ({dataEntered}) => {
  return (
    <div className="my-2 mx-2 card" inverse style={{width: '20rem',backgroundColor: '#e2e3e5'}}>
        <CardBody>
            <CardTitle tag="h4">Datos Ingresados</CardTitle>
            <CardText>
            <ul>            
                <li>{`Q = ${dataEntered.Q} m^3/s`}</li>
                <li>{`n = ${dataEntered.n}`}</li>
                <li>{`So = ${dataEntered.So} m/m`}</li>
                {dataEntered.B ? 
                <li>{`B = ${dataEntered.B} m`}</li>:null} 
                {dataEntered.d ?
                <li>{`d = ${dataEntered.d} m`}</li>:null}
                {dataEntered.m1 ?
                <li>{`m1 = ${dataEntered.m1}`}</li>:null}
                {dataEntered.m2 ?
                <li>{`m2 = ${dataEntered.m2}`}</li>:null}
            </ul>
            </CardText>
        </CardBody>
    </div>
  )
}
export default EnteredDataNormalDepth;