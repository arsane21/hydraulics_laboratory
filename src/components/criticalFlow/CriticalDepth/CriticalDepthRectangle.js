import React,{useState} from 'react'
import NavCriticalDepth from './NavCriticalDepth';
import {Row,Col,Container} from 'reactstrap'; 
import { AreaRectangle,
    WettedPerimeterRectangle,
    HydraulicRadiusRectangle ,
    surfaceWidthRectangle,
    HydraulicDepthRectangle } from '../../../modulos/GeometryElements/Rectangle';

import salto from '../../../images/rectanglechannel.png';
import EcnYcRectangle from '../../../images/EcnYcRectangle.PNG';
import AlertCalculationsWithn from './AlertCalculationsWithn';
import { Form, Field } from 'react-final-form';
import { Element} from 'react-scroll';
const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
validators.reduce((error, validator) => error || validator(value), undefined)

const DataEntered = ({dataEntered}) => {
    return (
        <div>
        <h5>Datos Ingresados </h5>
        <ul>            
            <li>{`Q = ${dataEntered.Q} m^3/s`}</li>
            <li>{`n = ${dataEntered.n}`}</li>
            <li>{`So = ${dataEntered.So} m/m`}</li>
            <li>{`B = ${dataEntered.B} m`}</li>  
        </ul>
    </div>
    )
  }

const CriticalDepthRectangleResults = ({Data}) => {
  return (
    <div>
        <h3>Rusultados </h3>
        <ul>
            <li><strong> {`Yc = ${Data.y}`}</strong></li>
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
                <li>{`B = ${dataEntered.B} m`}</li>
                <li>{`Ac = ${Data.A} m^2`}</li>
                <li>{`Pc = ${Data.P} m`}</li>
                <li>{`Rhc = ${Data.R} m`}</li>
                <li>{`Tc = ${Data.T} m`}</li>
                <li>{`Dc = ${Data.D} m`}</li>
            </ul>
        </div>
    )
}

const NormalDepthRectangle = () => { 

    const [dataEntered, setdataEntered] = useState('');
    const [Data,setData] = useState([]);
    const [Goal, setGoal] = useState(false);

    const onSubmit =  values => {

        const Q = Number(values.Q);
        const n =  Number(values.nManning);
        const B =  Number(values.B);

        setdataEntered({"Q":Q, "n":n, "B":B});
        const g = 9.80665;
        const yc = ((Q*Q)/(g*B*B))**(1/3);
        console.log(yc);
        
        const A = AreaRectangle(B,yc);
        const P = WettedPerimeterRectangle(B,yc);
        const R = HydraulicRadiusRectangle (B,yc)
        const T = surfaceWidthRectangle(B,yc);
        const D = HydraulicDepthRectangle(B,yc);

        let Sc;
        if (n !== 0){
            Sc = ((n*Q)/(A*Math.pow(R,(2/3))))**(2)
        }
        console.log("Sc",Sc);

        setData({"y":yc, "A" : A,"P" : P,"R" : R,"T" : T,"D" : D});
        setGoal(true);
    }
  return (
    <>
    <NavCriticalDepth active={'rectangle'}/>

    <Container style={{outline:'1px solid #ced4da'}} className='p-5 pt-2'>
        <Row md="2">
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="Q" validate={composeValidators(required, mustBeNumber)}>
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
                        <Field name="nManning" >
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={8}>
                                <label className='col-form-label'>Coeficiente de rugosidad de Manning (n)</label>
                                </Col>
                                <Col sm={4}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                                <Col sm={12}>
                                    <AlertCalculationsWithn/>
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
            <Row>
                <Col style={{display:'flex', justifyContent:'center',outline:'1px solid red'}}>
                    <img src={salto} alt="salto"  style={{width:'200px',height:'200px'}}/>
                </Col>
                <Col style={{display:'flex', justifyContent:'center',outline:'1px solid red'}}>
                    <img src={EcnYcRectangle} alt="salto"  style={{width:'200px',height:'100px'}}/>
                </Col>
            </Row>
        </Row>
        { (Goal)?
        <Row md="3" className='mt-4' style={{outline:'1px solid red'}}>
        <CriticalDepthRectangleResults Data={Data}/>
        <GeometryElements Data={Data} dataEntered={dataEntered}/>
        <DataEntered dataEntered={dataEntered}/>
        </Row>: null }
    </Container>
    </>
  )
}

export default NormalDepthRectangle;