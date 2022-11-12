import React from 'react'
import  {Container,Breadcrumb,BreadcrumbItem,Row,Col} from 'reactstrap'
import { Link } from "react-router-dom";

const SpecificEnergy = () => {
  return (
    <div>
        <Container style={{outline:'1px solid blue'}} className='pt-4 mt-5'>
        <Breadcrumb listTag="div">

            <BreadcrumbItem active tag="span">
                Flujo Uniforme
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
                Profundidad Normal Yn
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
                Canal Triangular
            </BreadcrumbItem>
        </Breadcrumb>
        </Container>
        <Container style={{outline:'1px solid #ced4da'}} className='px-5 py-1 mb-3'>
        <Link to="/specificEnergy/flow_conditions_after_a_step">Condiciones del flujo después de un escalón (Altura y velocidad) </Link>
        </Container>
        <h4>Problemas típicos </h4>

    </div>
  )
}

export default SpecificEnergy