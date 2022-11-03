import React from 'react'
import {Nav,NavItem,Container} from 'reactstrap';
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
  
const NavDischarge = ({active}) => {

  const [navlinkRectangle, setnavlinkRectangle] = useState('nav-link');
  const [navlinkTriangle, setnavlinkTriangle] = useState('nav-link');
  const [navlinkTrapeze, setnavlinkTrapeze] = useState('nav-link');
  const [navlinkCircle, setnavlinkCircle] = useState('nav-link');
  // const [navlinkSecCompuestas, setnavlinkSecCompuestas] = useState('nav-link');

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
    // else if (active === 'secCompuestas'){
    //   setnavlinkSecCompuestas('nav-link active');
    // }
  }, []);

  return (
    <Container className='mt-5 pt-4' style={{display:'flex', justifyContent:'space-evenly'}}>
      <Nav tabs>
    <NavItem>
      <Link className={navlinkRectangle} to="/flujouniforme/caudal/canalrectangular">Canal Rectangular</Link>
    </NavItem>
    <NavItem>
      <Link className={navlinkTriangle}  to="/flujouniforme/caudal/canaltriangular">Canal Triangular</Link>
    </NavItem>
    <NavItem>
      <Link className={navlinkTrapeze} to="/flujouniforme/caudal/canaltrapezoidal">Canal Trapezoidal</Link>
    </NavItem>
    <NavItem>
    <Link className={navlinkCircle} to="/flujouniforme/caudal/canalcircular">Canal Circular</Link>
    </NavItem>
    {/* <NavItem>
    <Link className={navlinkSecCompuestas} to="/flujouniforme/caudal/seccionescompuestas">Secciones Compuestas</Link>
    </NavItem> */}
  </Nav>
  </Container>
  )
}

export default NavDischarge;