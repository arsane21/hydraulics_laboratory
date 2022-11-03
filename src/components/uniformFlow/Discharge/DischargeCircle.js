
import React,{useState} from 'react'
// import NavNormalDepth from './NavNormalDepth';
import {Col,Container,Row} from 'reactstrap'; 
import { AreaCircle,
    WettedPerimeterCircle,
    HydraulicRadiusCircle,
    surfaceWidthCircle,
    HydraulicDepthCircle } from '../../../modulos/GeometryElements/Circle';
import AlertBisectionFailed from '../../NumericalAnalysis/AlertBisectionFailed';

import circularchannel from '../../../images/circularchannel.png';

import EcnDischarge from '../../../images/EcnDischarge.PNG';
import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';
import { Form, Field } from 'react-final-form';
import { FlowType } from '../../../modulos/FlowTypeDetermination';
import NavDischarge from './NavDischarge';
import DischargeResults from './DischargeResults';
import CardGeometryElements from '../../CardGeometryElements';
import EnteredDataDischarge from './EnteredDataDischarge';

const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
validators.reduce((error, validator) => error || validator(value), undefined)


const DischargeCircle = () => {
    const [dataEntered, setdataEntered] = useState('');
    const [Data, setData] = useState([]);
    const [Goal, setGoal] = useState(false);

    const onSubmit =  values => {

        const n =  Number(values.nManning);
        const So =  Number(values.slope);
        const y =  Number(values.y);
        const d =  Number(values.diameter);
        setdataEntered({"So":So, "n":n,"y":y, "d":d});

        const Tetha = 2*Math.acos(1 -(2*y/d));
        let result={};
        result.A = AreaCircle(Tetha,d);
        result.P = WettedPerimeterCircle(Tetha,d);
        result.R = HydraulicRadiusCircle (Tetha,d);
        result.T = surfaceWidthCircle(Tetha,d);
        result.D = HydraulicDepthCircle(Tetha,d);

        result.Q = result.A*Math.pow(result.R,2/3)*Math.sqrt(So) / n ;
        const flowType = FlowType(result.Q,result.A,result.D);
        result.V = result.Q/result.A;       
        result.F = flowType.F;
        result.flowType=flowType.flowType;

        setData(result);
        setGoal(true);
        setTimeout(() => {
        scroller.scrollTo("resultsDischargeCircle");
        },500)
    }

  return (
    <>
    <NavDischarge active={'circle'}/>
    <Container style={{outline:'1px solid #ced4da'}} className='p-5 py-2'>
        <Row md="2">
            <Col xs={{order: 2}} md={{order: 1}} className='p-2'>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
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
                                <label className='col-form-label'>Profundidad (y)</label>
                                </Col>
                                <Col sm={7}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="diameter" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={4}>
                                <label className='col-form-label'>Diametro (d)</label>
                                </Col>
                                <Col sm={8}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <div className="buttons">
                        <Element name="resultsDischargeCircle">
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
                    <img src={circularchannel} alt="salto"  style={{width:'400px',height:'210px'}}/>
                    <h4 className='mt-4 h4Ecuation'>Ecuación</h4>
                    <img src={EcnDischarge} alt="salto"  style={{width:'300px',height:'100px'}}/>
                </Row>
            </Col>
        </Row>
        { Data.failed ? <AlertBisectionFailed y0={Data.y0} y1={Data.y1}  fy0={Data.fy0} fy1={Data.fy1} />:null}
        { (Goal && !Data.failed)?
        <Row md="3" className='mt-4' style={{justifyContent:'center'}}>
            <DischargeResults Data={Data}/>
            <CardGeometryElements Data={Data} />
            <EnteredDataDischarge dataEntered={dataEntered}/>
        </Row> : null }
    </Container>
    </>
  )
}
export default DischargeCircle;