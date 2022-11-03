import React from 'react'
import {Col} from 'reactstrap'; 
import { Field } from 'react-final-form'
const BisectionForm = (props) => {
  return (
    <>
    <Field name="y0" validate={props.required}>
        {({ input, meta }) => (
        <div className='row mb-3'>
            <Col sm={8}>
            <label className='col-form-label'>Valor a la izquierda del cero de la función (y0)</label>
            </Col>
            <Col sm={4}>
            <input {...input} type="number" step="any" className="form-control"/>
            {meta.error && meta.touched && <span>{meta.error}</span>}
            </Col>
        </div>
        )}
    </Field>
    <Field name="y1" validate={props.required}>
        {({ input, meta }) => (
        <div className='row mb-3'>
            <Col sm={8}>
            <label className='col-form-label'>Valor a la derecha del cero de la función (y1)</label>
            </Col>
            <Col sm={4}>
            <input {...input} type="number" step="any" className="form-control"/>
            {meta.error && meta.touched && <span>{meta.error}</span>}
            </Col>
        </div>
        )}
    </Field>
    <Field name="tol" validate={props.required}>
        {({ input, meta }) => (
        <div className='row mb-3'>
            <Col sm={6} md={4}>
            <label className='col-form-label'>tolerancia</label>
            </Col>
            <Col sm={6} md={8}>
            <input {...input} type="number" step="any" placeholder="Error relativo permitido" className="form-control"/>
            {meta.error && meta.touched && <span>{meta.error}</span>}
            </Col>
        </div>
        )}
    </Field>
    </>
  )
}

export default BisectionForm