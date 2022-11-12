import React,{useState} from 'react'
import  {Container,Input,Label,Breadcrumb,BreadcrumbItem,Row,Col,FormGroup} from 'reactstrap'
import { Link } from "react-router-dom";

import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';

import { Form, Field } from 'react-final-form';

import { FlowType } from '../../modulos/FlowTypeDetermination';
import { AreaRectangle, HydraulicDepthRectangle} from '../../modulos/GeometryElements/Rectangle'; 
import bisection from '../../modulos/NumericalAnalysis/bisection';
import FlowConditionsAfterAStepResults from './CardFlowConditionsAfterAStepResults';
import EnteredDataFlowConditionsAfterAStep from './EnteredDataFlowConditionsAfterAStep';
import CardFlowConditionsBeforeAStepResults from './CardFlowConditionsBeforeAStepResults';


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    ReferenceLine } from 'recharts';
import { PointsEspecificEnergy } from '../../modulos/PointsEspecificEnergy';

// const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];



const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
validators.reduce((error, validator) => error || validator(value), undefined)


const g = 9.81;
const SpecificEnergy =  (y,v)=>{
    // if (Q) {
    //     return y + Math.pow(Q,2)/ 2*g*Math.pow(A,2)
    // }
        return y + Math.pow(v,2)/(2*g)
        // / 2*g
        // y
        //  + 
}
            
const FlowConditionsAfterAStep = () => {

    const [dataEntered, setdataEntered] = useState('');
    const [Data, setData] = useState([]);
    const [data,setdata] = useState({});
    const [E1, setE1] = useState();
    const [E2, setE2] = useState();
    const [Bisection, setBisection] = useState(false);
    const [Secant, setSecant] = useState(false);
    const [ChannelType, setChannelType] = useState('rectangular');

    const [Goal, setGoal] = useState(false);

    const HandleChange = (e)=>{
        const methodSelected = (e.currentTarget.value);
        setChannelType(methodSelected);
    }

    const onSubmit =  values => {

        // const Q1 = Number(values.caudal);        
        const v =  Number(values.velocity);
        const B =  Number(values.B);
        const y1 = Number(values.y);
        const z =  Number(values.step);
        console.log(ChannelType)

        let A;
        let D;
        if (ChannelType==='rectangular'){
            A = AreaRectangle(B,y1);
            D = HydraulicDepthRectangle(B,y1);
        }
        const Q1 = v*A;
        const E1 = SpecificEnergy(y1,v);
        console.log(E1)
        setdataEntered({"y1":y1,"v1":v,"E1":E1});
    
        const funciondey2 = (y2)=>{
            const Q2 =  Q1;
            const v2 = Q2/(B*y2)
           return (-E1 + z + y2 + (Math.pow(v2,2)/(2*g)));
        }
        console.log('puntos',data);
        let result={};
        const resulty2 = bisection(funciondey2,y1-Math.trunc(y1),20,0.00000001);
        const resultv2 = Q1 / (B*resulty2.y);
        result.y2 = resulty2.y;
        result.v2 = resultv2;
        result.E2 = SpecificEnergy(resulty2.y,resultv2);
        console.log(SpecificEnergy(resulty2.y,resultv2))
        console.log(resulty2);
        console.log(resultv2);
        setdata(PointsEspecificEnergy(Q1,B,y1,E1,resulty2.y,SpecificEnergy(resulty2.y,resultv2)));
        setE2(SpecificEnergy(resulty2.y,resultv2));
        const flowType = FlowType(Q1,A,D);
        // result.V = Q/result.A;       
        result.F = flowType.F;
        result.flowType = flowType.flowType;
        
        setData(result);
        // setBisection(result.bisection);
        setGoal(true);
        setE1(E1);
        scroller.scrollTo("resultsNormalDepthCircle");
    }
  return (
    <div>
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
    <Container style={{outline:'1px solid #ced4da'}} className='px-5 py-1 mb-3'>
    <Row md="2">
            <Col xs={{order: 2}} md={{order: 1}} className='p-5'>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Label
                            for="exampleSelect"
                            sm={4}
                            >
                            Tipo de canal
                            </Label>
                                    <Col sm={8}>
                                    <Input
                                        id="numericalMethods"
                                        name='numericalMethods'
                                        type="select"
                                        onChange={HandleChange}
                                    >
                                        <option value="rectangular">
                                            Rectangular
                                        </option>
                                        <option value="triangular">
                                            Triangular
                                        </option>
                                        <option value="secant">
                                            Circular
                                        </option>
                                        <option value="secant">
                                            Trapecial
                                        </option>
                                    </Input>
                                    </Col>
                        </FormGroup>
                        { (ChannelType === "rectangular")?
                        <>
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
                        </> 
                        : null}
                        { (ChannelType === "secant")?
                        <><h4>Datos necesarios para el Método Numérico</h4> </> 
                        : null}
                        <Field name="step" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={4}>
                                <label className='col-form-label'>Altura del escalón (z)</label>
                                </Col>
                                <Col sm={8}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <Field name="velocity" validate={composeValidators(required, mustBeNumber)}>
                            {({ input, meta }) => (
                            <div className='row mb-3'>
                                <Col sm={4}>
                                <label className='col-form-label'>Velocidad (v)</label>
                                </Col>
                                <Col sm={8}>
                                <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                </Col>
                            </div>
                            )}
                        </Field>
                        <div className="buttons">
                        <Element name="resultsNormalDepthCircle">
                            <button type="submit" className='btn btn-primary' disabled={submitting}>
                                Submit
                            </button>
                        </Element>
                        </div>
                    </form>
                )}
                />
            </Col>
            <Col xs={{order: 1}}  md={{order: 1}} className='p-2'>
                <Row style={{flexDirection:'column', alignItems:'center'}}>
                    {/* <img src={circularchannel} alt="salto"  style={{width:'400px',height:'300px'}}/>
                    <h4 className='mt-4 h4Ecuation'>Ecuación</h4>
                    <img src={EcnYnCircle} alt="salto"  style={{width:'400px',height:'100px'}}/> */}
                </Row>
            </Col>
        </Row>
        { (Goal)?
        <>
            <Row md="3" className='mt-4' style={{justifyContent:'center'}}>
                <FlowConditionsAfterAStepResults Data={Data}/>
                <CardFlowConditionsBeforeAStepResults dataEntered={dataEntered}/>
                <EnteredDataFlowConditionsAfterAStep dataEntered={dataEntered}/> 
            </Row>
            <ResponsiveContainer width="100%" aspect={1}>
            <LineChart
              layout="vertical"
              width={500}
              height={500}
              data={data}
              margin={{
                top: 20,
                right: 0,
                left: 20,
                bottom: 5,
              }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Line dataKey="pv" stroke="#8884d8" />
                <ReferenceLine x={E1} stroke="red" label="E1" />
                <ReferenceLine x={E2} stroke="blue" label="E2" />
                {/* <Line dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
            </ResponsiveContainer>
            </>
        : null }
    <Link to="/specificEnergy/flow_conditions_after_a_step">Condiciones del flujo después de un escalón (Altura y velocidad) </Link>
    </Container>
    <h4>Problemas típicos </h4>
    </div>


  )
}

export default FlowConditionsAfterAStep