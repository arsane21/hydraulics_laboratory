import React, { useState } from "react";
import NavCriticalDepth from "./NavCriticalDepth";
import { Col, Row, Container } from "reactstrap";
import { Form, Field } from "react-final-form";
import {
  AreaTriangle,
  WettedPerimeterTriangle,
  HydraulicRadiusTriangle,
  surfaceWidthTriangle,
  HydraulicDepthTriangle,
} from "../../../modulos/GeometryElements/Triangle";

import { FlowType } from "../../../modulos/FlowTypeDetermination";
import { Element } from "react-scroll";
import { scroller } from "react-scroll";

import trianglechannel from "../../../images/trianglechannel.png";
import EcnYcTriangle from "../../../images/EcnYcTriangle.PNG";
import AlertCalculationsWithn from "./AlertCalculationsWithn.js";

import bisection from "../../../modulos/NumericalAnalysis/bisection";
import TableBisection from "../../NumericalAnalysis/TableBisection";
import AlertBisectionFailed from "../../NumericalAnalysis/AlertBisectionFailed";
import BisectionForm from "../../Forms/BisectionForm";

const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const DataEntered = ({ dataEntered }) => {
  return (
    <div>
      <h5>Datos Ingresados </h5>
      <ul>
        <li>{`Q = ${dataEntered.Q} m^3/s`}</li>
        <li>{`m1 = ${dataEntered.m1}`}</li>
        <li>{`m2 = ${dataEntered.m2}`}</li>
      </ul>
    </div>
  );
};

const CriticalDepthTriangleResults = ({ Data }) => {
  return (
    <div>
      <h3>Rusultado </h3>
      <ul>
        <li>
          <strong> {`Yc = ${Data.y} m`}</strong>
        </li>
        {Data.Sc ? (
          <li>
            <strong> {`Sc = ${Data.Sc} m/m`}</strong>
          </li>
        ) : null}
      </ul>
      <h6>Características del flujo </h6>
      <ul>
        <li>{`F = ${Data.F} `}</li>
        <li>{Data.flowType}</li>
      </ul>
    </div>
  );
};

const GeometryElements = ({ Data, dataEntered }) => {
  return (
    <div>
      <h5>Elementos Geometricos </h5>
      <ul>
        <li>{`yc = ${Data.y} m`}</li>
        <li>{`m1 = ${dataEntered.m1}`}</li>
        <li>{`m1 = ${dataEntered.m2}`}</li>
        <li>{`Ac = ${Data.A} m^2`}</li>
        <li>{`Pc = ${Data.P} m`}</li>
        <li>{`Rhc = ${Data.R} m`}</li>
        <li>{`Tc = ${Data.T} m`}</li>
        <li>{`Dc = ${Data.D} m`}</li>
      </ul>
    </div>
  );
};

const CriticalDepthTriangle = () => {
  const [dataEntered, setdataEntered] = useState("");
  const [Data, setData] = useState([]);
  const [Goal, setGoal] = useState(false);
  const [Bisection, setBisection] = useState(false);

  const onSubmit = (values) => {
    const Q = Number(values.caudal);
    const n = Number(values.nManning);
    const m1 = Number(values.m1);
    const m2 = Number(values.m2);

    const y0 = Number(values.y0);
    const y1 = Number(values.y1);
    const tol = Number(values.tol);

    setdataEntered({ Q: Q, n: n, m1: m1, m2: m2 });
    const g = 9.80665;
    const funciondeyc = (y) => {
      return (
        [Q * Q * (m1 * y + m2 * y)] -
        [g * (0.5 * m1 * y * y + 0.5 * m2 * y * y) ** 3]
      );
    };
    let result;
    result = bisection(funciondeyc, y0, y1, tol);
    result.failed ? (result.bisection = false) : (result.bisection = true);
    console.log(result);

    const yc = result.y;
    const A = AreaTriangle(yc, m1, m2);
    const P = WettedPerimeterTriangle(yc, m1, m2);
    const R = HydraulicRadiusTriangle(yc, m1, m2);
    const T = surfaceWidthTriangle(yc, m1, m2);
    const D = HydraulicDepthTriangle(yc, m1, m2);
    const flowType = FlowType(Q, A, D);
    const V = Q / A;

    let Sc;
    if (n !== 0) {
      Sc = ((n * Q) / (A * Math.pow(R, 2 / 3))) ** 2;
    }
    console.log("Sc", Sc);
    setData({
      y: yc,
      V: V,
      F: flowType.F,
      flowType: flowType.flowType,
      A: A,
      P: P,
      R: R,
      T: T,
      D: D,
      Sc: Sc,
    });
    setGoal(true);
    setTimeout(() => {
      scroller.scrollTo("resultsNormalDepthTriangle");
    }, 500);
  };
  return (
    <>
      <NavCriticalDepth active={"triangle"} />

      <Container style={{ outline: "1px solid #ced4da" }} className="p-5 pt-2">
        <Row md="2">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="caudal"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div className="row mb-3">
                      <Col sm={4}>
                        <label className="col-form-label">Caudal (Q)</label>
                      </Col>
                      <Col sm={8}>
                        <input
                          {...input}
                          type="number"
                          step="any"
                          placeholder=""
                          className="form-control"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Col>
                    </div>
                  )}
                </Field>
                <Field
                  name="nManning"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div className="row mb-3">
                      <Col sm={8}>
                        <label className="col-form-label">
                          Coeficiente de rugosidad de Manning (n)
                        </label>
                      </Col>
                      <Col sm={4}>
                        <input
                          {...input}
                          type="number"
                          step="any"
                          placeholder=""
                          className="form-control"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Col>
                      <Col sm={12}>
                        <AlertCalculationsWithn />
                      </Col>
                    </div>
                  )}
                </Field>
                <Field
                  name="m1"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div className="row mb-3">
                      <Col sm={8}>
                        <label className="col-form-label">
                          Coeficiente de inclinación talud izquierdo (m1)
                        </label>
                      </Col>
                      <Col sm={4}>
                        <input
                          {...input}
                          type="number"
                          step="any"
                          placeholder=""
                          className="form-control"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Col>
                    </div>
                  )}
                </Field>
                <Field
                  name="m2"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div className="row mb-3">
                      <Col sm={8}>
                        <label className="col-form-label">
                          Coeficiente de inclinación talud derecho (m2)
                        </label>
                      </Col>
                      <Col sm={4}>
                        <input
                          {...input}
                          type="number"
                          step="any"
                          placeholder=""
                          className="form-control"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </Col>
                    </div>
                  )}
                </Field>

                <BisectionForm required={required} />

                <div className="buttons">
                  <Element name="resultsNormalDepthTriangle">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      Calcular
                    </button>
                  </Element>
                </div>
              </form>
            )}
          />
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                outline: "1px solid red",
              }}
            >
              <img
                src={trianglechannel}
                alt="salto"
                style={{ width: "400px", height: "200px" }}
              />
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                outline: "1px solid red",
              }}
            >
              <img
                src={EcnYcTriangle}
                alt="salto"
                style={{ width: "400px", height: "200px" }}
              />
            </Col>
          </Row>
        </Row>

        {Goal ? (
          <Row md="3" className="mt-4" style={{ outline: "1px solid red" }}>
            <CriticalDepthTriangleResults Data={Data} />
            <GeometryElements Data={Data} dataEntered={dataEntered} />
            <DataEntered dataEntered={dataEntered} />
          </Row>
        ) : null}
        {Data.failed ? (
          <AlertBisectionFailed
            x0={Data.y0}
            x1={Data.y1}
            fx0={Data.fy0}
            fx1={Data.fy1}
          />
        ) : null}
      </Container>
      <Container>
        {Bisection ? <TableBisection Data={Data.data} /> : null}
      </Container>
    </>
  );
};

export default CriticalDepthTriangle;
