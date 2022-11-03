import React from 'react'
import {
    Nav,
    NavItem,
    Container,
  } from 'reactstrap';
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
  
const NavNormalDepth = ({active}) => {
  // console.log("active en nav",active);

  const [navlinkRectangle, setnavlinkRectangle] = useState('nav-link');
  const [navlinkTriangle, setnavlinkTriangle] = useState('nav-link');
  const [navlinkTrapeze, setnavlinkTrapeze] = useState('nav-link');
  const [navlinkCircle, setnavlinkCircle] = useState('nav-link');
  const [navlinkSecCompuestas, setnavlinkSecCompuestas] = useState('nav-link');


  useEffect(() => {
    if (active === 'rectangle'){
      setnavlinkRectangle('nav-link active');
      }
    else if (active === 'triangle'){
      setnavlinkTriangle('nav-link active');
      }
    else if (active === 'trapeze'){
      setnavlinkTrapeze('nav-link active');
      }
    else if (active === 'circle'){
      setnavlinkCircle('nav-link active');
      } 
    else if (active === 'secCompuestas'){
      setnavlinkSecCompuestas('nav-link active');
    }
  }, []);

  // console.log("rect", navlinkRectangle);
  // console.log("tri", navlinkTriangle);
  // console.log("tra", navlinkTrapeze);
  // console.log("circle", navlinkCircle);
  // console.log("compuesta",navlinkSecCompuestas);
  
  return (
    <Container className='pt-2' style={{display:'flex', justifyContent:'space-evenly'}}>
      <Nav tabs>
    <NavItem>
      <Link className={navlinkRectangle} to="/flujouniforme/profundidadnormal/canalrectangular">Canal Rectangular</Link>
    </NavItem>
    <NavItem>
      <Link className={navlinkTriangle}  to="/flujouniforme/profundidadnormal/canaltriangular">Canal Triangular</Link>
    </NavItem>
    <NavItem>
      <Link className={navlinkTrapeze} to="/flujouniforme/profundidadnormal/canaltrapecial">Canal Trapecial</Link>
    </NavItem>
    <NavItem>
    <Link className={navlinkCircle} to="/flujouniforme/profundidadnormal/canalcircular">Canal Circular</Link>
    </NavItem>
    <NavItem>
    <Link className={navlinkSecCompuestas} to="/flujouniforme/profundidadnormal/seccionescompuestas">Secciones Compuestas</Link>
    </NavItem>
  </Nav>
  </Container>
  )
}

export default NavNormalDepth