import React,{useState} from 'react'
// import NavNormalDepth from './NavNormalDepth';
import {Row,Col,Container,Breadcrumb,BreadcrumbItem} from 'reactstrap'; 
import { AreaTriangle,
    WettedPerimeterTriangle,
    HydraulicRadiusTriangle ,
    surfaceWidthTriangle,
    HydraulicDepthTriangle } from '../../modulos/GeometryElements/Triangle';
import salto from '../../images/trianglechannel.png';
import { Form, Field } from 'react-final-form';

import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';


const GeoElemTriangle = () => { 

    const [Data,setData] = useState([]);

    const onSubmit = values => {
        const y =  Number(values.y);
        const m1 =  Number(values.m1);
        const m2 =  Number(values.m2);

        const A = AreaTriangle(y,m1,m2);
        const P = WettedPerimeterTriangle(y,m1,m2);
        const R = HydraulicRadiusTriangle (y,m1,m2)
        const T = surfaceWidthTriangle(y,m1,m2);
        const D = HydraulicDepthTriangle(y,m1,m2);
        setData({"y":y,"m1":m1,"m2":m2,"A":A, "P":P, "R":R, "T":T,"D":D});
        scroller.scrollTo("GeoElementsRectangle");
    }

const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

  return (
    <>
    <Container  className='pt-4 mt-5'>
        <Breadcrumb listTag="div">

            <BreadcrumbItem
                active
                tag="span"
            >
                Elementos Geométricos
            </BreadcrumbItem>
            <BreadcrumbItem
                active
                tag="span"
            >
                Canal Triangular
            </BreadcrumbItem>
        </Breadcrumb>
    </Container>
    <Container style={{outline:'1px solid #ced4da'}} className='px-5 pt-1 pb-5 mb-3'>
        <Row lg="3" md="2">
            <Col xs={{order: 2}} md={{order: 1}} className='p-2'>
            <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="y" validate={composeValidators(required, mustBeNumber)}>
                                {({ input, meta }) => (
                                <div className='row mb-3'>
                                    <Col sm={5} md={6}>
                                    <label className='col-form-label'>Altura del canal (y)</label>
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
                        <Col sm={5} md={6}>
                        <label className='col-form-label'>valor de m1</label>
                        </Col>
                        <Col sm={7} md={6}>
                        <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                        </Col>
                    </div>
                    )}
                </Field>
                <Field name="m2" validate={composeValidators(required, mustBeNumber)}>
                    {({ input, meta }) => (
                    <div className='row mb-3'>
                        <Col sm={5} md={6}>
                        <label className='col-form-label'>Valor de m2</label>
                        </Col>
                        <Col sm={7} md={6}>
                        <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                        </Col>
                    </div>
                    )}
                </Field>

                            <div className="buttons">
                                <Element name="resultsNormalDepthTriangle">
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
                <Row style={{justifyContent: 'center'}}>
                <img src={salto} alt="salto"  style={{width:'300px',height:'200px'}}/>
                </Row>
            </Col>
            <Col xs={{order: 3}}  md={{order: 1}} className='p-2'>
                <div className='mt-0'>
                    <h3>Resultados</h3>
                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="yResult">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>y</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.y} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p>m</p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                                <Field name="m1result">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>m1</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.m1} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p></p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                                <Field name="m1result">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>m2</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.m2} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p></p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                                <Field name="A">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>A</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.A} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p>m</p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                                <Field name="P">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>P</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.P} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p>m</p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                                <Field name="R">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>Rh</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.R} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p>m</p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                                <Field name="T">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>T</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.T} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p>m</p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                                <Field name="D">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>D</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.D} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p>m</p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                            </form>
                        )}
                        />
                </div>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default GeoElemTriangle;