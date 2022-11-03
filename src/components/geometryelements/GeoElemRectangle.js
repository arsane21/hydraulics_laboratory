import React,{useState} from 'react'
// import NavNormalDepth from './NavNormalDepth';
import {Row,Col,Container,Breadcrumb,BreadcrumbItem} from 'reactstrap'; 
import { AreaRectangle,WettedPerimeterRectangle,HydraulicRadiusRectangle ,
    surfaceWidthRectangle,HydraulicDepthRectangle } from '../../modulos/GeometryElements/Rectangle';
import salto from '../../images/rectanglechannel.png';
import { Form, Field } from 'react-final-form';

import { Element } from 'react-scroll';
import { scroller } from 'react-scroll';


const GeoElemRectangle = () => { 

    const [Data,setData] = useState([]);

    const onSubmit = values => {
        const B =  Number(values.B);
        const y =  Number(values.y);

        const A = AreaRectangle(B,y);
        const P = WettedPerimeterRectangle(B,y);
        const R = HydraulicRadiusRectangle (B,y)
        const T = surfaceWidthRectangle(B,y);
        const D = HydraulicDepthRectangle(B,y);
        setData({"B":B,"y":y,"A":A, "P":P, "R":R, "T":T,"D":D});
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
                active
                tag="span"
            >
                Elementos Geométricos
            </BreadcrumbItem>
            <BreadcrumbItem
                active
                tag="span"
            >
                Canal Rectangular
            </BreadcrumbItem>
        </Breadcrumb>
    </Container>
    <Container style={{outline:'1px solid #ced4da'}} className='px-5  pt-1 pb-5 mb-5'>
        
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
                            <Field name="B" validate={composeValidators(required, mustBeNumber)}>
                                {({ input, meta }) => (
                                <div className='row mb-3'>
                                    <Col sm={5} md={6}>
                                    <label className='col-form-label'>Ancho del canal (B)</label>
                                    </Col>
                                    <Col sm={7} md={6}>
                                    <input {...input} type="number" step="any" placeholder="" className="form-control"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </Col>
                                </div>
                                )}
                            </Field>
                            
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
                <Row style={{justifyContent: 'center'}}>
                <img src={salto} alt="salto"  style={{width:'300px',height:'300px'}}/>
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
                                        <p>m^2</p>
                                        </Col>
                                    </div>
                                    )}
                                </Field>
                                <Field name="Bresult">
                                    {({ input, meta }) => (
                                    <div className='row mb-1'>
                                        <Col xs={1}>
                                        <label className='col-form-label'>B</label>
                                        </Col>
                                        <Col xs={10}>
                                        <input {...input} type="number" value={Data.B} className="form-control"/>
                                        </Col>
                                        <Col xs={1}>
                                        <p>m</p>
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

export default GeoElemRectangle;