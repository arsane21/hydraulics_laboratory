import React,{useState} from 'react'
import NavNormalDepth from './NavNormalDepth';
import {Input,Label,FormGroup,Row,Col,Container,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import BisectionForm from '../../Forms/BisectionForm';
import bisection from '../../../modulos/NumericalAnalysis/bisection';
import secant from '../../../modulos/NumericalAnalysis/secant';

import TableBisection from '../../NumericalAnalysis/TableBisection';
import SecantForm from '../../Forms/SecantForm';
import TableSecant from '../../NumericalAnalysis/TableSecant';
import { AreaRectangle,WettedPerimeterRectangle,HydraulicRadiusRectangle ,surfaceWidthRectangle,HydraulicDepthRectangle } from '../../../modulos/GeometryElements/Rectangle';
import AlertBisectionFailed from '../../NumericalAnalysis/AlertBisectionFailed';

import salto from '../../../images/rectanglechannel.png';
import TableFixedPoint from '../../NumericalAnalysis/TableFixedPoint';
import { FlowType } from '../../../modulos/FlowTypeDetermination';

import { Form, Field } from 'react-final-form';

import EcnYcRectangle from '../../../images/EcnYnRectangle.PNG';
import EcnYcRectangleFP from '../../../images/EcnYnRectangleFP.PNG';

import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';

import NormalDepthResults from './NormalDepthResults';
import CardGeometryElements from '../../CardGeometryElements';
import EnteredDataNormalDepth from './EnteredDataNormalDepth';
const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const NormalDepthRectangle = () => { 

    const [dataEntered, setdataEntered] = useState('');
    const [Data,setData] = useState([]);
    const [Bisection, setBisection] = useState(false);
    const [Secant, setSecant] = useState(false);
    const [Method, setMethod] = useState('bisection');
    const [Goal, setGoal] = useState(false);

    const HandleChange = (e)=>{
        const methodSelected = (e.currentTarget.value);
        console.log("metodo",methodSelected)
        setMethod(methodSelected);
    }

    const onSubmit = values => {

        const Q = Number(values.caudal);
        const n =  Number(values.nManning);
        const So =  Number(values.slope);
        const B =  Number(values.B);

        const y0 = Number(values.y0);
        const y1 = Number(values.y1);
        const tol = Number(values.tol);

          setdataEntered({"Q":Q, "n":n,"So":So, "B":B});
          const beta = (Q*n)/(Math.sqrt(So));
    
        const funciondeyn = (y)=>{
           return Math.pow(beta,3)*(B+2*y)**2 - (B**5)*(y**5);
        };

        let result;

        if (Method === "bisection"){
            result = bisection(funciondeyn,y0,y1,tol);
            (result.failed) ?result.bisection = false :result.bisection = true;
        } else if (Method === "secant"){
            result = secant(funciondeyn,y0,y1,tol);
            result.secant = true;
        }
        result.A = AreaRectangle(B,result.y);
        result.P = WettedPerimeterRectangle(B,result.y);
        result.R = HydraulicRadiusRectangle (B,result.y)
        result.T = surfaceWidthRectangle(B);
        result.D = HydraulicDepthRectangle(B,result.y);

        const flowType = FlowType(Q,result.A,result.D);
        const V = Q/result.A;
        result.V = V;
        console.log(flowType);        
        result.F = flowType.F;
        result.flowType = flowType.flowType;
        console.log(result);
        setData(result);
        setBisection(result.bisection);
        setSecant(result.secant);
        setGoal(true);
        setTimeout(() => {
            scroller.scrollTo("resultsNormalDepthRectangle");
          }, 500)
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
                Canal Rectangular
            </BreadcrumbItem>
        </Breadcrumb>
    </Container>
    <NavNormalDepth active={'rectangle'}/>

    <Container style={{outline:'1px solid #ced4da'}} className='px-5 py-1 mb-3'>    
        <Row md="2">
            <Col xs={{order: 2}} md={{order: 1}} className='p-5'>
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
                                <input {...input} type="number" step="any" className="form-control"/>
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
                                <input {...input} type="number" step="any"  className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="slope" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={5} md={7}>
                                <label className='col-form-label'>Pendiente del canal (So)</label>
                                </Col>
                                <Col sm={7} md={5}>
                                <input {...input} type="number" step="any" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="B" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={5} md={6}>
                                <label className='col-form-label'>Ancho del canal (B)</label>
                                </Col>
                                <Col sm={7} md={6}>
                                <input {...input} type="number" step="any" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <FormGroup row>
                                    <Label
                                    for="exampleSelect"
                                    sm={6}
                                    >
                                    Método Numérico
                                    </Label>
                                    <Col sm={6}>
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
                                    <SecantForm required={required}/>
                                    </> : null}
                                    <div className="buttons">
                                        <Element name="resultsNormalDepthRectangle">
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
                    <img src={salto} alt="salto"  style={{width:'300px',height:'300px'}}/>
                    <h4 className='mt-4 h4Ecuation'>Ecuación</h4>
                    {(Method !== 'fixedPoint') ?
                    <img src={EcnYcRectangle} alt="salto"  style={{width:'400px',height:'100px'}}/> :
                    <img src={EcnYcRectangleFP} alt="salto"  style={{width:'400px',height:'150px'}}/>
                    }
                </Row>
            </Col>
        </Row>
        { Data.failed ? <AlertBisectionFailed y0={Data.y0} y1={Data.y1}  fy0={Data.fy0} fy1={Data.fy1} />:null}
        { (Goal && !Data.failed)?
            <Row md="3" className='mt-4' style={{justifyContent:'center'}}>
                <NormalDepthResults Data={Data}/>
                <CardGeometryElements Data={Data}/>
                <EnteredDataNormalDepth dataEntered={dataEntered}/>
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

export default NormalDepthRectangle;