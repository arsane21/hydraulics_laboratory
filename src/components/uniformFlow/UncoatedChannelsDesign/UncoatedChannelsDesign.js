import React from 'react'
import {Form,Input,Label,FormGroup,Col} from 'reactstrap'; 

const UncoatedChannelsDesign = () => {
  return (
    <div>
        <Form>
            <FormGroup row>
                <Label for="caudal" sm={2}> Caudal (Q)</Label>
                <Col sm={10}>
                    <Input id="caudal" name="caudal" placeholder="valor del caudal" type="number"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="VelocidadMaxima" sm={2}> Velocidad máxima (Vmax)</Label>
                <Col sm={10}>
                    <Input id="VelocidadMaxima" name="VelocidadMaxima" placeholder="valor de la maxima velocidad permitida" type="number"/>
                </Col>
            </FormGroup>
            
            <FormGroup row>
            <Label
                for="nManning"
                sm={4}
            >
                Coeficiente de rugosidad de Manning (n)
            </Label>
            <Col sm={8}>
                <Input id="nManning" name="nManning" placeholder="n de Manning" type="number"/>
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label
                for="examplePassword"
                sm={2}
            >
                Pendiente del canal (So)
            </Label>
            <Col sm={10}>
                <Input
                id="examplePassword"
                name="number"
                placeholder="number placeholder"
                type="number"
                />
            </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="anchoDelCanal" sm={2}> Base del canal (B)</Label>
                <Col sm={10}>
                    <Input id="anchoDelCanal" name="anchoDelCanal" placeholder="Ancho Del Canal" type="number"/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="pendiente" sm={2}> Pendiente del canal (So)</Label>
                <Col sm={10}>
                    <Input id="pendiente" name="pendiente" placeholder="Pendiente del canal" type="number"/>
                </Col>
            </FormGroup>
        </Form>
    </div>
  )
}

export default UncoatedChannelsDesign