import React,{useState} from 'react';
import {Form,Input,Label,FormGroup,Col,Row,Button,Container} from 'reactstrap'; 
import BisectionForm from '../../Forms/BisectionForm';
import SecantForm from '../../Forms/SecantForm';
import FixedPointForm from '../../Forms/FixedPointForm';
import bisection from '../../../modulos/NumericalAnalysis/bisection';
import secant from '../../../modulos/NumericalAnalysis/secant';
import fixedPoint from '../../../modulos/NumericalAnalysis/fixedPoint';

import TableBisection from '../../NumericalAnalysis/TableBisection';
import TableSecant from '../../NumericalAnalysis/TableSecant';

import AlertBisectionFailed from '../../NumericalAnalysis/AlertBisectionFailed';
import trapeciochannel from '../../../images/trapeciochannel.png';
import EcnBisecAndSecant from '../../../images/EcnYcTrapeze.PNG';
import { AreaTrapeze,WettedPerimeterTrapeze,HydraulicRadiusTrapeze,surfaceWidthTrapeze,HydraulicDepthTrapeze} from '../../../modulos/GeometryElements/Trapeze';
import TableFixedPoint from '../../NumericalAnalysis/TableFixedPoint';
import NavCriticalDepth from './NavCriticalDepth';
import AlertCalculationsWithn from './AlertCalculationsWithn';

const DataEntered = ({dataEntered}) => {
    return (
        <div>
        <h3>Datos Ingresados </h3>
        <ul>            
            <li>{`Q = ${dataEntered.Q} m^3/s`}</li>
            <li>{`n = ${dataEntered.n}`}</li>
            <li>{`So = ${dataEntered.So} m/m`}</li>
            <li>{`B = ${dataEntered.B} m`}</li>
            <li>{`m1 = ${dataEntered.m1}`}</li>
            <li>{`m2 = ${dataEntered.m2}`}</li>  
        </ul>
        </div>
    )
  }

const CriticalDepthTrapezeResults = ({Data}) => {
  return (
    <div>
        <h3>Rusultados </h3>
        <ul>
            <li><strong> {`Yc = ${Data.y}`}</strong></li>
            <li><strong> {`Iteraciones = ${Data.numberIterations}`}</strong></li>
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
            <h3>Elementos Geometricos </h3>
            <ul>
                <li>{`yc = ${Data.y} m`}</li>
                <li>{`Ac = ${Data.A} m^2`}</li>
                <li>{`Pc = ${Data.P} m`}</li>
                <li>{`Rhc = ${Data.R} m`}</li>
                <li>{`Tc = ${Data.T} m`}</li>
                <li>{`Dc = ${Data.D} m`}</li>
            </ul>
        </div>
    )
}






const CriticalDepthTrapeze = () => {

    const [dataEntered, setdataEntered] = useState('');
    const [Data,setData] = useState([]);
    const [Bisection, setBisection] = useState(false);
    const [Secant, setSecant] = useState(false);
    const [FixedPoint, setFixedPoint] = useState(false);

    const [Method, setMethod] = useState('');

    const [Goal, setGoal] = useState(false);

    const HandleChange = (e)=>{
        const methodSelected = (e.currentTarget.value);
        setMethod(methodSelected);
    }

    const HandleSubmit = (e)=>{
        e.preventDefault();
        const Q = Number(e.currentTarget.caudal.value);
        const n =  Number(e.currentTarget.nManning.value);
        const So =  Number(e.currentTarget.pendiente.value);
        const B =  Number(e.currentTarget.baseDelCanal.value);
        const m1 =  Number(e.currentTarget.m1.value);
        const m2 =  Number(e.currentTarget.m2.value);
        
        setdataEntered({"Q":Q, "n":n,"So":So, "B":B, "m1":m1, "m2":m2});
        const g = 9.80665;
        const beta = (Q*n)/(Math.sqrt(So));
    
        const alpha = Math.sqrt(m1*m1 + 1);
            const phi = Math.sqrt(m2*m2 + 1);

        const funciondeyn = (y)=>{
           return (((Q*Q*( m1*y + m2*y + B)) / (g*(B*y + 0.5*m1*y*y + 0.5*m2*y*y)**3) ) - 1);
        }

        const funcionDeYnFixedPoint = (y)=>{
            const aux = (B*y + 0.5*y*y*(m1+m2))**5 / Math.pow(beta,3);
            return ((Math.sqrt(aux) - B)/(alpha + phi));
        }

        // Método numérico seleccionado
        const method =  e.currentTarget.numericalMethods.value;

        let result;

        if (method === "bisection"){
            const y0 = Number(e.currentTarget.y0.value);
            const y1 = Number(e.currentTarget.y1.value);
            const tol = Number(e.currentTarget.tol.value);
            result = bisection(funciondeyn,y0,y1,tol);
            (result.failed) ? 
            result.bisection = false :
            result.bisection = true;

        } else if (method === "secant"){
            const y0 = Number(e.currentTarget.y0.value);
            const y1 = Number(e.currentTarget.y1.value);
            const tol = Number(e.currentTarget.tol.value);
            result = secant(funciondeyn,y0,y1,tol);
            result.secant = true;
        }else if (method === "fixedPoint"){
            const y0 = Number(e.currentTarget.y0.value);
            const tol = Number(e.currentTarget.tol.value);
            result = fixedPoint(funcionDeYnFixedPoint,y0,tol);
            result.fixedPoint = true;
        }

        const A = AreaTrapeze(B,result.y,m1,m2);
        const P = WettedPerimeterTrapeze(B,result.y,m1,m2);
        const R = HydraulicRadiusTrapeze (B,result.y,m1,m2);
        const T = surfaceWidthTrapeze(B,result.y,m1,m2);
        const D = HydraulicDepthTrapeze(B,result.y,m1,m2);

        result.A = A;
        result.P = P;
        result.R = R;
        result.T = T;
        result.D = D;

        const F = (Q/A)/ Math.sqrt(g*D);
        let Sc;
        if (n !== 0){
            Sc = ((n*Q)/(A*Math.pow(R,(2/3))))**(2)
        }
        console.log("Sc",Sc);
        result.F = F;
        result.Sc = Sc;

        console.log("result despues de añadir propiedades)",result);
        setData(result);
        setBisection(result.bisection);
        setSecant(result.secant);
        setFixedPoint(result.fixedPoint);
        setGoal(true);
    }

  return (
    <>
    <NavCriticalDepth active={'trapeze'}/>
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
            <Label
                for="pendiente"
                sm={5}
            >
                Pendiente del canal (So)
            </Label>
            <Col sm={7}>
                <Input id="pendiente" name="pendiente" placeholder="pendiente" type="number" step="any" />
            </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="baseDelCanal" sm={4}> Base del canal (B)</Label>
                <Col sm={8}>
                    <Input id="baseDelCanal" name="baseDelCanal" placeholder="base Del Canal" type="number" step="any"/>
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

            <FormGroup row>
                <Label
                for="exampleSelect"
                sm={4}
                >
                Método Numérico
                </Label>
                <Col sm={8}>
                <Input
                    id="numericalMethods"
                    name="numericalMethods"
                    type="select"
                    onChange={HandleChange}
                >
                    <option value="bisection">
                        Bisección
                    </option>
                    <option value="secant">
                        Método de la Secante
                    </option>
                    <option value="fixedPoint">
                        Método de Punto fijo
                    </option>
                </Input>
                </Col>
            </FormGroup>

            { (Method === "bisection")?
                <>
                <h4>Datos necesarios para el Método Numérico</h4> 
                <BisectionForm/>
                </> : null}

            { (Method === "secant")?
                <>
                <h4>Datos necesarios para el Método Numérico</h4> 
                <SecantForm/>
                </> : null}

                { (Method === "fixedPoint")?
                <>
                <h4>Datos necesarios para el Método Numérico</h4> 
                <FixedPointForm/>
                </> : null}

            <Button>
                Calcular
            </Button>
        </Form>
        <Row>
        <Col style={{display:'flex', justifyContent:'center',outline:'1px solid red'}}>
        <img src={trapeciochannel} alt="salto"  style={{width:'400px',height:'200px'}}/>
        </Col>
        <Col style={{display:'flex', justifyContent:'center',outline:'1px solid red'}}>
        <img src={EcnBisecAndSecant} alt="salto"  style={{width:'400px',height:'200px'}}/>
        </Col>
        </Row>
    </Row>

    { (Goal && !Data.failed)?
        <Row md="3" className='mt-4' style={{outline:'1px solid red'}}>
        <CriticalDepthTrapezeResults Data={Data}/>
        <GeometryElements Data={Data} dataEntered={dataEntered}/>
        <DataEntered dataEntered={dataEntered}/>
        </Row>: null }
        { Data.failed ? <AlertBisectionFailed x0={Data.y0} x1={Data.y1}  fx0={Data.fy0} fx1={Data.fy1} />:null}
    </Container>
    <Container>   
        { Bisection ? <TableBisection Data={Data.data} />:null}
        { Secant ? <TableSecant Data={Data.data} /> : null}
        { FixedPoint ? <TableFixedPoint Data={Data.data} />: null}
    </Container>
    </>
  )
}

export default CriticalDepthTrapeze;