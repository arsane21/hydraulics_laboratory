import React from 'react'
import { Alert } from 'reactstrap';
import { useState } from 'react';

const AlertBisectionFailed = (props) => {

    const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="warning" isOpen={visible} toggle={onDismiss}>
        <h4 className="alert-heading">
            El método de Bisección diverge
        </h4>
        <p>
            para los valores {`{y0 = ${props.y0}, y1 = ${props.y1}}`} con {`{f(y0) = ${props.fy0}, f(y1) = ${props.fy1}}`} el método diverge, dado que {`f(y0)*f(y1) > 0`}
        </p>
        <hr />
        <p>
            Más información acerca del método de bisección <a href='#'>Aquí</a>
        </p>
    </Alert>
  )
}

export default AlertBisectionFailed