import React,{useState} from 'react'
import NavCriticalDepth from './NavCriticalDepth';
import {Form,Input,Label,FormGroup,Col,Row,Button,Container} from 'reactstrap'; 
import { AreaTriangle,WettedPerimeterTriangle,HydraulicRadiusTriangle ,surfaceWidthTriangle,HydraulicDepthTriangle } from '../../../modulos/GeometryElements/Triangle';

import salto from '../../../images/trianglechannel.png';
import EcnYcTriangle from '../../../images/EcnYcTriangle.PNG';
import AlertCalculationsWithn from './AlertCalculationsWithn.js';

const DataEntered = ({dataEntered}) => {
    return (
        <div>
        <h5>Datos Ingresados </h5>
        <ul>            
            <li>{`Q = ${dataEntered.Q} m^3/s`}</li>
            <li>{`m1 = ${dataEntered.m1}`}</li>
            <li>{`m2 = ${dataEntered.m2}`}</li>  
        </ul>
    </div>
    )
  }

const CriticalDepthTriangleResults = ({Data}) => {
  return (
    <div>
        <h3>Rusultado </h3>
        <ul>
            <li><strong> {`Yc = ${Data.y} m`}</strong></li>
            {Data.Sc ? <li><strong> {`Sc = ${Data.Sc} m/m`}</strong></li>: null}
        </ul>
        <h6>Características del flujo </h6>
        <ul>            
            <li>{`F = ${Data.F} `}</li>
            <li>{`aquí va el tipo de flujo (subcritico, supercritico o critico)`}</li>  
        </ul>
    </div>
  )
}

const GeometryElements = ({Data,dataEntered}) =>{

    return(
        <div>
            <h5>Elementos Geometricos </h5>
            <ul>
                <li>{`yc = ${Data.y} m`}</li>
                <li>{`m1 = ${dataEntered.m1}`}</li>
                <li>{`m1 = ${dataEntered.m2}`}</li>
                <li>{`Ac = ${Data.A} m^2`}</li>
                <li>{`Pc = ${Data.P} m`}</li>
                <li>{`Rhc = ${Data.R} m`}</li>
                <li>{`Tc = ${Data.T} m`}</li>
                <li>{`Dc = ${Data.D} m`}</li>
            </ul>
        </div>
    )
}

const CriticalDepthTriangle = () => { 

    const [dataEntered, setdataEntered] = useState('');
    const [Data,setData] = useState([]);
    const [Goal, setGoal] = useState(false);

    const HandleSubmit = (e)=>{
        e.preventDefault();
        const Q = Number(e.currentTarget.caudal.value);
        const m1 =  Number(e.currentTarget.m1.value);
        const m2 =  Number(e.currentTarget.m1.value);
        const n =  Number(e.currentTarget.nManning.value);
        const g = 9.80665;

        setdataEntered({"Q":Q,"m1":m1,"m2":m2});

        console.log({"Q":Q,"m1":m1,"m2":m2,"n":n});
        const yc = ((8*Q*Q)/(Math.pow(m1+m2,2)*g))**(1/5)

        const A = AreaTriangle(yc,m1,m2);
        const P = WettedPerimeterTriangle(yc,m1,m2);
        const R = HydraulicRadiusTriangle (yc,m1,m2)
        const T = surfaceWidthTriangle(yc,m1,m2);
        const D = HydraulicDepthTriangle(yc,m1,m2);

        const F = (Q/A)/ Math.sqrt(g*D);
        let Sc;
        if (n !== 0){
            Sc = ((n*Q)/(A*Math.pow(R,(2/3))))**(2)
        }
        console.log("Sc",Sc);

        setData({"y":yc, "A" : A,"P" : P,"R" : R,"T" : T,"D" : D,"F":F,"Sc":Sc});
        setGoal(true);
    }
  return (
    <>
    <NavCriticalDepth active={'triangle'}/>

    <Container style={{outline:'1px solid #ced4da'}} className='p-5 pt-2'>
    <Row md="2">
        <Form onSubmit={HandleSubmit}>
            <FormGroup row>
                <Label for="caudal" sm={4}> Caudal (Q)</Label>
                <Col sm={8}>
                    <Input id="caudal" name="caudal" placeholder="valor del caudal" type="number" step="any"/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="nManning" sm={8}>
                Coeficiente de rugosidad de Manning (n)
                </Label>
                <Col sm={4}>
                    <Input id="nManning" name="nManning" placeholder="n de Manning" type="number" step="any"/>
                </Col>
                <Col>
                    <AlertCalculationsWithn/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="m1" sm={8}> Coeficiente de inclinación talud izquierdo (m1)</Label>
                <Col sm={4}>
                    <Input id="m1" name="m1" placeholder="valor de m1" type="number" step="any"/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="m2" sm={8}> Coeficiente de inclinación talud derecho (m2)</Label>
                <Col sm={4}>
                    <Input id="m2" name="m2" placeholder="Valor de m2" type="number" step="any"/>
                </Col>
            </FormGroup>
            <Button>
                Calcular
            </Button>
        </Form>
        <Row>
            <Col style={{display:'flex', justifyContent:'center',outline:'1px solid red'}}>
                <img src={salto} alt="salto"  style={{width:'400px',height:'200px'}}/>
            </Col>
            <Col style={{display:'flex', justifyContent:'center',outline:'1px solid red'}}>
                <img src={EcnYcTriangle} alt="salto"  style={{width:'300px',height:'100px'}}/>
            </Col>
        </Row>
    </Row>
    { (Goal)?
        <Row md="3" className='mt-4' style={{outline:'1px solid red'}}>
        <CriticalDepthTriangleResults Data={Data}/>
        <GeometryElements Data={Data} dataEntered={dataEntered}/>
        <DataEntered dataEntered={dataEntered}/>
        </Row>: null }
    </Container>
    </>
  )
}

export default CriticalDepthTriangle;