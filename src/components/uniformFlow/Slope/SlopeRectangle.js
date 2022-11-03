import React,{useState} from 'react'
import {Col,Container,Row,Breadcrumb,BreadcrumbItem} from 'reactstrap'; 
import { AreaRectangle,
    WettedPerimeterRectangle,
    HydraulicRadiusRectangle ,
    surfaceWidthRectangle,
    HydraulicDepthRectangle } from '../../../modulos/GeometryElements/Rectangle';
import AlertBisectionFailed from '../../NumericalAnalysis/AlertBisectionFailed';

import circularchannel from '../../../images/rectanglechannel.png';

import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';
import { Form, Field } from 'react-final-form';
import { slope } from '../../../modulos/Slope';
import { FlowType } from '../../../modulos/FlowTypeDetermination';
import NavSlope from './NavSlope';
import EcnSlope from '../../../images/EcnSlope.png';
import SlopeResults from './SlopeResults';
import CardGeometryElements from '../../CardGeometryElements';
import EnteredDataSlope from './EnteredDataSlope';

const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
validators.reduce((error, validator) => error || validator(value), undefined)


const SlopeRectangle = () => {
    const [dataEntered, setdataEntered] = useState('');
    const [Data, setData] = useState([]);
    const [Goal, setGoal] = useState(false);

    const onSubmit =  values => {

        const Q = Number(values.caudal);
        const n =  Number(values.nManning);
        const y =  Number(values.y);
        const B =  Number(values.B);

        const A = AreaRectangle(B,y);
        const P = WettedPerimeterRectangle(B,y);
        const R = HydraulicRadiusRectangle (B,y)
        const T = surfaceWidthRectangle(B,y);
        const D = HydraulicDepthRectangle(B,y);

        const So = slope(n,Q,A,R);
        const V = Q/A;
        const flowType = FlowType(Q,A,D);
        setdataEntered({"Q":Q, "n":n,"y":y, "B":B});
        setData({"S":So,"V":V,"Q":Q, "A":A,"P":P,"R":R,"T":T,"D":D,
        "F":flowType.F, "flowType":flowType.flowType});
        setGoal(true);
        setTimeout(() => {
            scroller.scrollTo("resultsSlopeRectangle");
        },500);
    }

  return (
    <>
    <Container style={{outline:'1px solid blue'}} className='pt-4 mt-5'>
        <Breadcrumb listTag="div">

            <BreadcrumbItem active tag="span">
                Flujo Uniforme
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
                Cálculo de la pendiente
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
                Canal Rectangular
            </BreadcrumbItem>
        </Breadcrumb>
    </Container>
    <NavSlope active={'rectangle'}/>
    <Container style={{outline:'1px solid #ced4da'}}  className='px-5 py-1 mb-3'>
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
                        <Field name="y" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={5}>
                                <label className='col-form-label'>profundidad (y)</label>
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
                        <div className="buttons">
                            <Element name="resultsSlopeRectangle">
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
                    <img src={circularchannel} alt="salto"  style={{width:'300px',height:'200px'}}/>
                    <h4 className='mt-4 h4Ecuation'>Ecuación</h4>
                    <img src={EcnSlope} alt="salto"  style={{width:'200px',height:'100px'}}/>
                </Row>
            </Col>
        </Row>
        { Data.failed ? <AlertBisectionFailed y0={Data.y0} y1={Data.y1}  fy0={Data.fy0} fy1={Data.fy1} />:null}
        { (Goal && !Data.failed)?
        <Row md="3" className='mt-4'  style={{justifyContent:'center'}}>
        <SlopeResults Data={Data}/>
        <CardGeometryElements Data={Data}/>
        <EnteredDataSlope dataEntered={dataEntered}/>
        </Row> : null }
    </Container>
    </>
  )
}

export default SlopeRectangle;