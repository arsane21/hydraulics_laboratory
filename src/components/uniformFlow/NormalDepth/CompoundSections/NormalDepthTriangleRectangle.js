import React,{useState} from 'react'
import NavNormalDepth from '../NavNormalDepth';
import {Input,Label,FormGroup,Row,Col,Container} from 'reactstrap';
import BisectionForm from '../../../Forms/BisectionForm';
import bisection from '../../../../modulos/NumericalAnalysis/bisection';
import secant from '../../../../modulos/NumericalAnalysis/secant';
import TableBisection from '../../../NumericalAnalysis/TableBisection';
import SecantForm from '../../../Forms/SecantForm';
import TableSecant from '../../../NumericalAnalysis/TableSecant';
import AlertBisectionFailed from '../../../NumericalAnalysis/AlertBisectionFailed';
import { AreaTriangle,WettedPerimeterTriangle,HydraulicRadiusTriangle, surfaceWidthTriangle, HydraulicDepthTriangle } from '../../../../modulos/GeometryElements/Triangle';
import trapezecirclechannel from '../../../../images/trianglerectanglechannel.png';
import { FlowType } from '../../../../modulos/FlowTypeDetermination';

import EcnYcRectangle from '../../../../images/EcnYnCircleTrapeze.PNG';
import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';

import { Form, Field } from 'react-final-form';

const DataEntered = ({dataEntered}) => {
    return (
        <div>
        <h5>Datos Ingresados </h5>
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
};

const NormalDepthCircleTrapezeResults = ({Data}) => {
  return (
    <div>
        <h3>Rusultados </h3>
            {Data.flowInTriangle ?
            <>
                <h6 className='letterRed'> El flujo ocurre unicamente en la sección triangular</h6>
                <ul>
                    <li><strong> {`Yn = ${Data.y} m`}</strong></li>
                    <li><strong>{`Y`}<small><i>triangulo</i></small>{` = ${Data.yTriangle} m`}</strong></li>
                </ul>
                </>:
                <>
                <ul>
                    <li><strong> {`Yn = ${Data.y} m`}</strong></li>
                    <li><strong> {`Iteraciones = ${Data.numberIterations}`}</strong></li>
                    <li><strong>{`Y`}<small><i>triangulo</i></small>{` = ${Data.yTriangle} m`}</strong></li>
                </ul>
                </> }
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
            <h5>Elementos Geometricos </h5>
            <ul>
                <li>{`y = ${Data.y} m`}</li>
                <li>{`A = ${Data.A} m^2`}</li>
                <li>{`P = ${Data.P} m`}</li>
                <li>{`Rh = ${Data.R} m`}</li>
                <li>{`T = ${Data.T} m`}</li>
                <li>{`D = ${Data.D} m`}</li>
            </ul>
        </div>
    )
}

const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const NormalDepthCircleTrapeze = () => { 

    const [dataEntered, setdataEntered] = useState('');
    const [Data,setData] = useState([]);
    const [Bisection, setBisection] = useState(false);
    const [Secant, setSecant] = useState(false);
    const [Method, setMethod] = useState('bisection');
    const [Goal, setGoal] = useState(false);

    const HandleChange = (e)=>{
        const methodSelected = (e.currentTarget.value);
        setMethod(methodSelected);
    }

    const onSubmit = values => {
        const Q = Number(values.caudal);
        const n =  Number(values.nManning);
        const So =  Number(values.slope);
        const B =  Number(values.B);
        const m1 =  Number(values.m1);
        const m2 =  Number(values.m2);

        const y0 = Number(values.y0);
        const y1 = Number(values.y1);
        const tol = Number(values.tol);

        setdataEntered({"Q":Q, "n":n,"So":So,"B":B,"m1":m1,"m2":m2});
        const yTriangle = B/(m1+m2);
        console.log("yt",yTriangle);
        
    
        const At = AreaTriangle(yTriangle,m1,m2);
        const Pt = WettedPerimeterTriangle(yTriangle,m1,m2);
        const Rt = HydraulicRadiusTriangle (yTriangle,m1,m2);
        const Tt = surfaceWidthTriangle(yTriangle,m1,m2);
        const Dt = HydraulicDepthTriangle(yTriangle,m1,m2);

        const Qmaxtriangle = (1/n)*(Math.sqrt(So))*At*(Math.pow(Rt,(2/3)));
        console.log("QMAX",Qmaxtriangle);

        const beta = (Q*n)/(Math.sqrt(So));
        const alpha = Math.sqrt(m1*m1 + 1);
        const phi = Math.sqrt(m2*m2 + 1);
        
        const functionYnTriRec = (y) => {
            return ((Math.pow(beta,3)*((Pt + 2*(y-yTriangle))**2))- ((At + B*(y-yTriangle))**5));
        }

        let result={};

        if (Qmaxtriangle > Q){
            result.flowInTriangle = true;
            const yn =  ((32*Math.pow(beta,3)*Math.pow(alpha + phi , 2))/Math.pow(m1+m2,5))**(1/8);
            result.y = yn;
            result.A = AreaTriangle(yn,m1,m2);
            result.P = WettedPerimeterTriangle(yn,m1,m2);
            result.R = HydraulicRadiusTriangle (yn,m1,m2);
            result.T = surfaceWidthTriangle(yn,m1,m2);
            result.D = HydraulicDepthTriangle(yn,m1,m2);
        }else{
            if (Method === "bisection"){
                result = bisection(functionYnTriRec,y0,y1,tol);
                (result.failed) ? 
                result.bisection = false :
                result.bisection = true;
            }else if (Method === 'secant'){
                const y0 = Number(values.y0);
                const y1 = Number(values.y1);
                const tol = Number(values.tol);
                result = secant(functionYnTriRec,y0,y1,tol);
                result.secant = true;
            }
            result.A = At + B*(result.y-yTriangle);
            result.P = Pt + 2*(result.y-yTriangle);
            result.R = result.A/result.P;
            result.T = B;
            result.D = result.A/B;           
        }
        result.yTriangle = yTriangle;
        const flowType = FlowType(Q,result.A,result.D);       
        result.F = flowType.F;
        result.flowType = flowType.flowType;
        setData(result);
        setGoal(true);
        setBisection(result.bisection);
        setSecant(result.secant);
        scroller.scrollTo("resultsNormalDepthCircleTrapeze");
    }
  return (
    <>
    <NavNormalDepth active={'secCompuestas'}/>

    <Container style={{outline:'1px solid #ced4da'}} className='p-5 py-2'>
        <Row md="2">
            <Col xs={{order: 2}} md={{order: 1}} className='p-2'>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="caudal" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={4}>
                                <label className='col-form-label'>Caudal (Q)</label>
                                </Col>
                                <Col sm={8}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="nManning" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={8}>
                                <label className='col-form-label'>Coeficiente de rugosidad de Manning (n)</label>
                                </Col>
                                <Col sm={4}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="slope" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={5}>
                                <label className='col-form-label'>Pendiente del canal (So)</label>
                                </Col>
                                <Col sm={7}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="B" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={5} md={6}>
                                <label className='col-form-label'>Ancho del Canal (B)</label>
                                </Col>
                                <Col sm={7} md={6}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="m1" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={8}>
                                <label className='col-form-label'>Coeficiente de inclinación talud izquierdo (m1)</label>
                                </Col>
                                <Col sm={4}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="m2" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={8}>
                                <label className='col-form-label'>Coeficiente de inclinación talud derecho (m2)</label>
                                </Col>
                                <Col sm={4}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
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
                                        name='numericalMethods'
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
                            <BisectionForm required={required}/>
                            </> : null}

                                { (Method === "secant")?
                                    <>
                                    <h4>Datos necesarios para el Método Numérico</h4> 
                                    <SecantForm/>
                                    </> : null}
                                    <div className="buttons">
                                        <Element name="resultsNormalDepthTrapeze">
                                            <button type="submit" className='btn btn-primary' disabled={submitting}>
                                            Submit
                                            </button>
                                        </Element>
                                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
                />
            </Col>
            <Col xs={{order: 1}}  md={{order: 1}} className='p-2'>
                <Row style={{flexDirection:'column', alignItems:'center'}}>
                        <img src={trapezecirclechannel} alt="salto"  style={{width:'400px',height:'300px'}}/>
                        <h4 className='mt-4 h4Ecuation'>Ecuación</h4>
                        <img src={EcnYcRectangle} alt="salto"  style={{width:'500px',height:'100px'}}/>
                </Row>
            </Col>
        </Row>
        { Data.failed ? <AlertBisectionFailed x0={Data.x0} x1={Data.x1}  fx0={Data.fx0} fx1={Data.fx1} />:null}
        { (Goal && !Data.failed)?
        <Row md="3" className='mt-4'>
            <NormalDepthCircleTrapezeResults Data={Data}/>
            <GeometryElements Data={Data} dataEntered={dataEntered}/>
            <DataEntered dataEntered={dataEntered}/>
        </Row>
        : null }
    </Container>
    <Container className='my-3'>
        { Bisection ? <TableBisection Data={Data.data} />:null}
        { Secant ? <TableSecant Data={Data.data} /> : null}
    </Container>

    </>
  )
}

export default NormalDepthCircleTrapeze;