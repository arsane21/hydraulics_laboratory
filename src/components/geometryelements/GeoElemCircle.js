import React,{useState} from 'react'
// import NavNormalDepth from './NavNormalDepth';
import {Row,Col,Container,Breadcrumb,BreadcrumbItem} from 'reactstrap'; 
import { AreaCircle,WettedPerimeterCircle,
    HydraulicRadiusCircle ,
    surfaceWidthCircle,
    HydraulicDepthCircle } from '../../modulos/GeometryElements/Circle';
import salto from '../../images/circularchannel.png';
import { Form, Field } from 'react-final-form';

import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';

const GeoElemCircle = () => {
    const [Data,setData] = useState([]);

    const onSubmit = values => {
        const y =  Number(values.y);
        const d =  Number(values.diameter);
        const Tetha = 2*Math.acos(1 -(2*y/d));
        const A = AreaCircle(Tetha,d);
        const P = WettedPerimeterCircle(Tetha,d);
        const R = HydraulicRadiusCircle (Tetha,d);
        const T = surfaceWidthCircle(Tetha,d);
        const D = HydraulicDepthCircle(Tetha,d);
        setData({"y":y,"d":d,"Tetha":Tetha,"A":A, "P":P, "R":R, "T":T,"D":D});
        scroller.scrollTo("GeoElementsRectangle");
    }

const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

  return (
    <>
    <Container className='pt-4 mt-5'>
        <Breadcrumb listTag="div">

            <BreadcrumbItem
                href="#"
                tag="a"
            >
                Elementos Geométricos
            </BreadcrumbItem>
            <BreadcrumbItem
                active
                tag="span"
            >
                Canal Circular
            </BreadcrumbItem>
        </Breadcrumb>
    </Container>
    <Container style={{outline:'1px solid #ced4da'}} className='px-5  pt-1 pb-4 mb-5'>
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
                    <Field name="diameter" validate={composeValidators(required, mustBeNumber)}>
                        {({ input, meta }) => (
                        <div className='row mb-3'>
                            <Col sm={5} md={6}>
                            <label className='col-form-label'>Diametro (d)</label>
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
                                <Field name="dresult">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>d</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.d} className="form-control"/>
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
                                        <label className='col-form-label'><span>&#952;</span></label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.Tetha} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p>rad</p>
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
                                        <p>m^2</p>
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

export default GeoElemCircle