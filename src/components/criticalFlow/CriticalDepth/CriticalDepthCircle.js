
import React,{useState} from 'react'
import NavCriticalDepth from './NavCriticalDepth';
import {Form,Input,Label,FormGroup,Col,Button,Container,Row} from 'reactstrap'; 
import BisectionForm from '../../Forms/BisectionForm';
import bisection from '../../../modulos/NumericalAnalysis/bisection';
import secant from '../../../modulos/NumericalAnalysis/secant';
import FixedPointForm from '../../Forms/FixedPointForm';
import TableBisection from '../../NumericalAnalysis/TableBisection';
import SecantForm from '../../Forms/SecantForm';
import TableSecant from '../../NumericalAnalysis/TableSecant';
import { AreaCircle,WettedPerimeterCircle,HydraulicRadiusCircle, surfaceWidthCircle, HydraulicDepthCircle } from '../../../modulos/GeometryElements/Circle';
import AlertBisectionFailed from '../../NumericalAnalysis/AlertBisectionFailed';

import circularchannel from '../../../images/circularchannel.png';
import TableFixedPoint from '../../NumericalAnalysis/TableFixedPoint';

import AlertCalculationsWithn from './AlertCalculationsWithn.js';
import { FlowType } from '../../../modulos/FlowTypeDetermination';

const DataEntered = ({dataEntered}) => {
    return (
        <div>
        <h3>Datos Ingresados </h3>
        <ul>            
            <li>{`Q = ${dataEntered.Q} m^3/s`}</li>
            <li>{`n = ${dataEntered.n}`}</li>
            <li>{`So = ${dataEntered.So} m/m`}</li>
            <li>{`d = ${dataEntered.d} m`}</li>  
        </ul>
    </div>
    )
}

const CriticalDepthCircleResults = ({Data}) => {
  return (
    <div>
            <h3>Rusultados </h3>
            <ul>
                <li><strong><span>&#952;</span>{`c = ${Data.y} rad`}</strong></li>
                <li><strong> {`Iteraciones = ${Data.numberIterations}`}</strong></li>
                <li><strong> {`Yc = ${Data.Yc}`}</strong></li>
                
            </ul>
            <h6>Características del flujo </h6>
        <ul>            
            <li>{`F = ${Data.F} `}</li>
            <li>{Data.flowType}</li>  
        </ul>
        </div>
  )
}

const GeometryElements = ({Data,dataEntered}) =>{

    return(
        <div>
            <h3>Elementos Geometricos </h3>
            <ul>
                <li>{`yc = ${Data.Yc} m`}</li>
                <li>{`d = ${dataEntered.d} m`}</li>
                <li>{`Ac = ${Data.A} m^2`}</li>
                <li>{`Pc = ${Data.P} m`}</li>
                <li>{`Rhc = ${Data.R} m`}</li>
            </ul>
        </div>
    )
}

const findYc = (O,d) =>{
    return (d/2)*(1 - Math.cos(O/2));
}


const CriticalDepthCircle = () => {
    const [dataEntered, setdataEntered] = useState('');
    const [Data, setData] = useState([]);
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
        const d =  Number(e.currentTarget.diameter.value);

        setdataEntered({"Q":Q, "n":n,"So":So, "d":d});

        const beta = (Q*n)/(Math.sqrt(So));
        const g = 9.80665;

        const funcionDeTetha = (O)=>{
           return  ( (512*Q*Q*Math.sin(O/2))/(((O - Math.sin(O))**3)*Math.pow(d,5)*g) ) - 1;
        }

        const funcionDeTethaFixedPoint = (O)=>{
            return Math.sqrt((Math.pow(d,8)*Math.pow(O-Math.sin(O),5))/(8192*Math.pow(beta,3)));
         }

        // Método numérico seleccionado
        const method =  e.currentTarget.numericalMethods.value;
    
        let result;

        if (method === "bisection"){
            const y0 = Number(e.currentTarget.y0.value);
            const y1 = Number(e.currentTarget.y1.value);
            const tol = Number(e.currentTarget.tol.value);
            result = bisection(funcionDeTetha,y0,y1,tol);
            (result.failed) ? 
            result.bisection = false :
            result.bisection = true;
        } else if (method === "secant"){
            const y0 = Number(e.currentTarget.y0.value);
            const y1 = Number(e.currentTarget.y1.value);
            const tol = Number(e.currentTarget.tol.value);
            result = secant(funcionDeTetha,y0,y1,tol);
            result.secant = true;
        }

        result.Yc = findYc(result.y , d);
        const A = AreaCircle(result.y,d);
        const P = WettedPerimeterCircle(result.y,d);
        const R = HydraulicRadiusCircle (result.y,d);
        const T = surfaceWidthCircle(result.y,d);
        const D = HydraulicDepthCircle(result.y,d);
        result.A = A;
        result.P = P;
        result.R = R;
        result.T = T;
        result.D = D;

        const flowType = FlowType(Q,A,D);
        console.log(flowType);        
        result.F = flowType.F;
        result.flowType = flowType.flowType;

        if (n !== 0){
            result.Sc = ((n*Q)/(A*Math.pow(R,(2/3))))**(2)
        }
        console.log("Sc",result.Sc);
        console.log("result despues de añadir propiedades)",result);
        setData(result);
        setBisection(result.bisection);
        setSecant(result.secant);
        setFixedPoint(result.fixedPoint);
        setGoal(true);
        console.log("datos",Data);
    }

  return (
    <>
    <NavCriticalDepth active={'circle'}/>
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
                <Label for="diameter" sm={5}> Diametro del canal (d)</Label>
                <Col sm={7}>
                    <Input id="diameter" name="diameter" placeholder="diametro" type="number" step="any"/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label
                for="exampleSelect"
                sm={2}
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
        <Col style={{display:'flex', justifyContent:'center',outline:'1px solid red'}}>
        <img src={circularchannel} alt="salto"  style={{width:'400px',height:'300px'}}/>
        </Col>
        </Row>
        
        
        { (Goal && !Data.failed)?
        <Row md="3" className='mt-4' style={{outline:'1px solid blue'}}>
        <CriticalDepthCircleResults Data={Data}/>
        <GeometryElements Data={Data} dataEntered={dataEntered}/>
        <DataEntered dataEntered={dataEntered}/>
        </Row> : null }

        { Data.failed ? <AlertBisectionFailed x0={Data.x0} x1={Data.x1}  fx0={Data.fx0} fx1={Data.fx1} />:null}
    </Container>
    <Container>   
        { Bisection ? <TableBisection Data={Data.data} />:null}
        { Secant ? <TableSecant Data={Data.data} /> : null}
        { FixedPoint ? <TableFixedPoint Data={Data.data} />: null}
    </Container>
    </>
  )
}

export default CriticalDepthCircle;