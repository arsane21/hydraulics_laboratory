import React from 'react'
import { CardBody,CardTitle,CardText } from 'reactstrap';
const CardGeometryElements = ({Data}) => {
  return (
    <div className="my-2 mx-2 card" inverse style={{width: '20rem',backgroundColor: '#ffecb5'}}>
          <CardBody>
              <CardTitle tag="h4">Elementos Geometricos</CardTitle>
              <CardText>
                <ul>
                    <li>{`A = ${Data.A} m^2`}</li>
                    <li>{`P = ${Data.P} m`}</li>
                    <li>{`Rh = ${Data.R} m`}</li>
                    <li>{`T = ${Data.T} m`}</li>
                    <li>{`D = ${Data.D} m`}</li>
                </ul>
              </CardText>
          </CardBody>
    </div>
  )
}
export default CardGeometryElements;