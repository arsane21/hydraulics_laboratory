
import React from 'react'
import NavNormalDepth from '../NavNormalDepth';
import {Row,Col,Container,Card,CardBody,CardTitle} from 'reactstrap';
import trapezecirclechannel from '../../../../images/trapezecirclechannel.png';
import trianglerectanglechannel from '../../../../images/trianglerectanglechannel.png';

import { Link } from "react-router-dom";


const listCompoundSections =[
    {'name': 'Canal de sección Semicirculo-Trapecio ',
    'linkTo':'/flujouniforme/profundidadnormal/seccionescompuestas/circulotrapecio',
    'src': trapezecirclechannel},
    {'name': 'Canal de sección Triangulo-Rectangulo',
    'linkTo':'/flujouniforme/profundidadnormal/seccionescompuestas/triangulorectangulo',
    'src': trianglerectanglechannel}
]
const CompoundSections = () => {

  return (
    <>
    <NavNormalDepth active={'secCompuestas'}/>
    <Container style={{outline:'1px solid #ced4da'}} className='p-5 pt-2'>
        <Row md={3}>
            {listCompoundSections.map((CompoundSection,index) =>
            <Col>
            <Link to={CompoundSection.linkTo}>
                <Card style={{width: '18rem',height:'21rem',outline:'1px solid'}}>
                    <CardBody>
                        <CardTitle tag="h5">{CompoundSection.name}</CardTitle>
                    </CardBody>
                    <img alt="Card cap" src={`${CompoundSection.src}`} width="100%"/>
                    <CardBody>
                    </CardBody>
                </Card>
            </Link>
            </Col>
            )}
        </Row>
    </Container>
    </>
  )
}

export default CompoundSections