import React from 'react'
import {Input,Label,FormGroup,Col} from 'reactstrap'; 
const FixedPointForm = () => {
  return (
    <>
        <FormGroup row>
                <Label for="y0" sm={4}> Valor incial (y0)</Label>
                <Col sm={8}>
                    <Input id="y0" name="y0" placeholder="valor de y0" type="number" step="any"/>
                </Col>
        </FormGroup>

        <FormGroup row>
                <Label for="tol" sm={4}> tolerancia </Label>
                <Col sm={8}>
                    <Input id="tol" name="tol" placeholder="Error relativo permitido" type="number" step="any"/>
                </Col>
        </FormGroup>
        </>
  )
}

export default FixedPointForm