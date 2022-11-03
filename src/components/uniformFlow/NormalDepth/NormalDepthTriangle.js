import React,{useState} from 'react'
import NavNormalDepth from './NavNormalDepth';
import {Row,Col,Container,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import { AreaTriangle,WettedPerimeterTriangle,HydraulicRadiusTriangle ,surfaceWidthTriangle,HydraulicDepthTriangle } from '../../../modulos/GeometryElements/Triangle';
import triangulochannel from '../../../images/trianglechannel.png';
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


const NormalDepthTriangle = () => {

    const [dataEntered, setdataEntered] = useState('');
    const [Data,setData] = useState([]);
    const [Goal, setGoal] = useState(false);

    const onSubmit = values => {
        const Q = Number(values.caudal);
        const n =  Number(values.nManning);
        const So =  Number(values.slope);
        const m1 =  Number(values.m1);
        const m2 =  Number(values.m2);
        
        setdataEntered({"Q":Q, "n":n,"So":So, "m1":m1, "m2":m2});
        
        const beta = (Q*n)/(Math.sqrt(So));
        console.log("beta",beta);
        console.log(Math.pow(beta,3));
        const alpha = Math.sqrt(m1*m1 + 1);
        console.log(alpha);
        const phi = Math.sqrt(m2*m2 + 1);
        console.log(phi);
        const yn =  (((32*Math.pow(beta,3)*((alpha+phi)**2))/((m1+m2)**5))**(1/8));
        console.log(yn);
        const A = AreaTriangle(yn,m1,m2);
        const P = WettedPerimeterTriangle(yn,m1,m2);
        const R = HydraulicRadiusTriangle (yn,m1,m2)
        const T = surfaceWidthTriangle(yn,m1,m2);
        const D = HydraulicDepthTriangle(yn,m1,m2);
        const flowType = FlowType(Q,A,D);
        const V = Q/A;       

        setData({ "y":yn,"V":V,"F":flowType.F,"flowType":flowType.flowType,"A":A, "P":P, "R":R, "T":T, "D":D,});
        setGoal(true);
        setTimeout(() => {
            scroller.scrollTo("resultsNormalDepthTriangle");
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
                Canal Triangular
            </BreadcrumbItem>
        </Breadcrumb>
    </Container>
    <NavNormalDepth active={'triangle'}/>
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
                                    <Col sm={5} md={7}>
                                    <label className='col-form-label'>Pendiente del canal (So)</label>
                                    </Col>
                                    <Col sm={7} md={5}>
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

                            <div className="buttons">
                                <Element name="resultsNormalDepthTriangle">
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
        <img src={triangulochannel} alt="salto"  style={{width:'400px',height:'200px'}}/>
        </Col>
    </Row>

    { Goal?
        <Row md="3" className='mt-4' style={{justifyContent:'center'}}>
            <NormalDepthResults Data={Data} />
            <CardGeometryElements Data={Data}/>
            <EnteredDataNormalDepth dataEntered={dataEntered}/>
        </Row>: null}
    </Container>
    </>
  )
}

export default NormalDepthTriangle;