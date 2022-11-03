import React,{useState} from 'react';
import NavNormalDepth from './NavNormalDepth';
import {Input,Label,FormGroup,Col,Row,Container,Breadcrumb,BreadcrumbItem} from 'reactstrap'; 
import BisectionForm from '../../Forms/BisectionForm';
import SecantForm from '../../Forms/SecantForm';
import bisection from '../../../modulos/NumericalAnalysis/bisection';
import secant from '../../../modulos/NumericalAnalysis/secant';
import TableBisection from '../../NumericalAnalysis/TableBisection';
import TableSecant from '../../NumericalAnalysis/TableSecant';

import AlertBisectionFailed from '../../NumericalAnalysis/AlertBisectionFailed';
import trapeciochannel from '../../../images/trapeciochannel.png';

import { AreaTrapeze,WettedPerimeterTrapeze,HydraulicRadiusTrapeze,surfaceWidthTrapeze,HydraulicDepthTrapeze} from '../../../modulos/GeometryElements/Trapeze';

import EcnYnTrapeze from '../../../images/EcnYnTrapeze.PNG';

import { Form, Field } from 'react-final-form';
import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';
import NormalDepthResults from './NormalDepthResults';
import { FlowType } from '../../../modulos/FlowTypeDetermination';
import CardGeometryElements from '../../CardGeometryElements';
import EnteredDataNormalDepth from './EnteredDataNormalDepth';

const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const NormalDepthTrapeze = () => {

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

    const onSubmit =  values => {
        const Q = Number(values.caudal);
        const n =  Number(values.nManning);
        const So =  Number(values.slope);
        const B =  Number(values.B);
        const m1 =  Number(values.m1);
        const m2 =  Number(values.m2);

        const y0 = Number(values.y0);
        const y1 = Number(values.y1);
        const tol = Number(values.tol);
        
        setdataEntered({"Q":Q, "n":n,"So":So, "B":B, "m1":m1, "m2":m2});

        const beta = (Q*n)/(Math.sqrt(So));
    
        const alpha = Math.sqrt(m1*m1 + 1);
        const phi = Math.sqrt(m2*m2 + 1);
        

        const funciondeyn = (y)=>{
           return Math.pow(beta,3)*(B+y*(alpha+phi))**2 - ((B*y + 0.5*y*y*(m1+m2))**5);
        }

        let result;

        if (Method === "bisection"){
            result = bisection(funciondeyn,y0,y1,tol);
            // console.log(result);
            (result.failed) ? result.bisection = false : result.bisection = true;
        } else if (Method === "secant"){
            result = secant(funciondeyn,y0,y1,tol);
            result.secant = true;
        } 
        result.A = AreaTrapeze(B,result.y,m1,m2);
        result.P = WettedPerimeterTrapeze(B,result.y,m1,m2);
        result.R = HydraulicRadiusTrapeze (B,result.y,m1,m2);
        result.T = surfaceWidthTrapeze(B,result.y,m1,m2);
        result.D = HydraulicDepthTrapeze(B,result.y,m1,m2);

        const flowType = FlowType(Q,result.A,result.D);
        result.V = Q/result.A;       
        result.F = flowType.F;
        result.flowType = flowType.flowType;

        setData(result);
        setBisection(result.bisection);
        setSecant(result.secant);
        setGoal(true);
        setTimeout(() => {
        scroller.scrollTo("resultsNormalDepthTrapeze");
        },500)
    }

  return (
    <>
    <Container style={{outline:'1px solid blue'}} className='pt-4 mt-5'>
        <Breadcrumb listTag="div">

            <BreadcrumbItem active tag="span">
                Flujo Uniforme
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
                Profundidad Normal Yn
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
                Canal Trapecial
            </BreadcrumbItem>
        </Breadcrumb>
    </Container>
    <NavNormalDepth active={'trapeze'}/>
    <Container style={{outline:'1px solid #ced4da'}} className='px-5 py-1 mb-3'>
    <Row md="2">
        <Col xs={{order: 2}} md={{order: 1}} className='p-5'>
        <Form onSubmit={onSubmit}
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
                        <Col sm={4}>
                        <label className='col-form-label'>Ancho del canal (B)</label>
                        </Col>
                        <Col sm={8}>
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
                    Calcular
                    </button>
                </Element>
            </div>
            </form>
        )}
        />
        </Col>
        <Col xs={{order: 1}}  md={{order: 1}} className='p-2'>
            <Row style={{flexDirection:'column', alignItems:'center'}}>
                <img src={trapeciochannel} alt="salto"  style={{width:'400px',height:'200px'}}/>
                <h4 className='mt-4 h4Ecuation'>Ecuación</h4>
                <img src={EcnYnTrapeze} alt="salto"  style={{width:'400px',height:'100px'}}/>
            </Row>
        </Col>
    </Row>

    { (Goal && !Data.failed)?
        <Row md="3" className='mt-4' style={{justifyContent:'center'}}>
        <NormalDepthResults Data={Data}/>
        <CardGeometryElements Data={Data} />
        <EnteredDataNormalDepth dataEntered={dataEntered}/> 
        </Row>: null }
        { Data.failed ? <AlertBisectionFailed x0={Data.x0} x1={Data.x1}  fx0={Data.fx0} fx1={Data.fx1} />:null}
    </Container>
    <Container className='mt-3'>   
        { Bisection ? <TableBisection Data={Data.data} />:null}
        { Secant ? <TableSecant Data={Data.data} /> : null}
    </Container>
    </>
  )
}

export default NormalDepthTrapeze;