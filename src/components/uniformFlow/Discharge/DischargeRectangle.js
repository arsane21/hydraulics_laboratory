import React,{useState} from 'react';
import NavDischarge from './NavDischarge';
import {Col,Row,Container} from 'reactstrap'; 
import rectanglechannel from '../../../images/rectanglechannel.png';

import { AreaRectangle,WettedPerimeterRectangle,HydraulicRadiusRectangle,surfaceWidthRectangle,HydraulicDepthRectangle} from '../../../modulos/GeometryElements/Rectangle';
import EcnDischarge from '../../../images/EcnDischarge.PNG';

import { Form, Field } from 'react-final-form';
import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';
import DischargeResults from './DischargeResults';
import { FlowType } from '../../../modulos/FlowTypeDetermination';
import CardGeometryElements from '../../CardGeometryElements';
import EnteredDataDischarge from './EnteredDataDischarge';

const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const DischargeRectangle = () => {

    const [dataEntered, setdataEntered] = useState('');
    const [Data,setData] = useState([]);
    const [Goal, setGoal] = useState(false);

    const onSubmit =  values => {
        const y = Number(values.y);
        const n =  Number(values.nManning);
        const So =  Number(values.slope);
        const B =  Number(values.B);


        setdataEntered({"y":y, "n":n,"So":So, "B":B});

        let result={};
        result.A = AreaRectangle(B,y);
        result.P = WettedPerimeterRectangle(B,y);
        result.R = HydraulicRadiusRectangle (B,y);
        result.T = surfaceWidthRectangle(B,y);
        result.D = HydraulicDepthRectangle(B,y);

        result.Q = result.A*Math.pow(result.R,2/3)*Math.sqrt(So) / n ;

        const flowType = FlowType(result.Q,result.A,result.D);
        result.V = result.Q/result.A;       
        result.F = flowType.F;
        result.flowType=flowType.flowType;

        setData(result);
        setGoal(true);
        setTimeout(() => {
        scroller.scrollTo("resultsDischargeRectangle");
        },500)
    }

  return (
    <>
    <NavDischarge active={'rectangle'}/>
    <Container style={{outline:'1px solid #ced4da'}} className='p-5 py-2'>
    <Row md="2">
        <Col xs={{order: 2}} md={{order: 1}} className='p-2'>
        <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
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
                <img src={rectanglechannel} alt="salto"  style={{width:'400px',height:'200px'}}/>
                <h4 className='mt-4 h4Ecuation'>Ecuación</h4>
                <img src={EcnDischarge} alt="salto"  style={{width:'300px',height:'100px'}}/>
            </Row>
        </Col>
    </Row>

        { Goal?
        <Row md="3" className='mt-4' style={{justifyContent:'center'}}>
        <DischargeResults Data={Data}/>
        <CardGeometryElements Data={Data} />
        <EnteredDataDischarge dataEntered={dataEntered}/> 
        </Row>: null }
    </Container>
    </>
  )
}

export default DischargeRectangle;