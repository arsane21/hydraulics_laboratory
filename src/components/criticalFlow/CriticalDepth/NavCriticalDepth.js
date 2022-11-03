import React from 'react'
import {
    Nav,
    NavItem,
    Container,
  } from 'reactstrap';
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
  
const NavCriticalDepth = ({active}) => {

  console.log("active en nav",active);

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

  console.log("rect", navlinkRectangle);
  console.log("tri", navlinkTriangle);
  console.log("tra", navlinkTrapeze);
  console.log("circle", navlinkCircle);
  console.log("compuesta",navlinkSecCompuestas);

  return (
    <Container className='mt-5 pt-4' style={{display:'flex', justifyContent:'center',outline:'1px solid blue'}}>
      <Nav tabs>
    <NavItem>
      <Link className={navlinkRectangle} to="/flujocritico/profundidadcritica/canalrectangular">Canal Rectangular</Link>
    </NavItem>
    <NavItem>
      <Link className={navlinkTriangle} to="/flujocritico/profundidadcritica/canaltriangular">Canal Triangular</Link>
    </NavItem>
    <NavItem>
      <Link className={navlinkTrapeze} to="/flujocritico/profundidadcritica/canaltrapezoidal">Canal Trapezoidal</Link>
    </NavItem>
    <NavItem>
      <Link className={navlinkCircle} to="/flujocritico/profundidadcritica/canalcircular">Canal Circular</Link>
    </NavItem>
  </Nav>
  </Container>
  )
}

export default NavCriticalDepth