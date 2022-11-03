import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import Logo from '../images/salto.png';

import { Link } from "react-router-dom";

const NavHeader = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
        <Navbar {...args} expand="md" 
        fixed='top'
        style={{outline:'1px solid',backgroundColor:'#fff'}}
        light
        >
        <NavbarBrand href="/">
        <img
            alt="logo"
            src={Logo}
            style={{
            height: 30,
            width: 80
            }}
        />
        <span className='ms-3'>Laboratorio Hidráulico</span>
        </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    Elementos geometricos
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem><Link to="/elementosgeometricos/canalrectangular">Canal Rectangular</Link></DropdownItem>
                        <DropdownItem><Link to="/elementosgeometricos/canaltriangular">Canal Triangular</Link></DropdownItem>
                        <DropdownItem><Link to="/elementosgeometricos/canalcircular"> Canal Circular</Link></DropdownItem>
                        <DropdownItem><Link to="/elementosgeometricos/canaltrapezoidal">Canal Trapezoidal</Link></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem disabled><Link to="/elementosgeometricos/seccionescompuestas">Secciones compuestas</Link></DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Flujo Uniforme
                </DropdownToggle>

                <DropdownMenu end>
                        <DropdownItem><Link to="/flujouniforme/profundidadnormal/canalrectangular">Profundidad normal Yn</Link></DropdownItem>
                        <DropdownItem><Link to="/flujouniforme/pendiente/canalrectangular">Cálculo de pendiente So</Link></DropdownItem>
                        <DropdownItem><Link to="/flujouniforme/caudal/canalrectangular"> Cálculo de Caudal Q</Link></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem disabled> <Link to="/flujouniforme/CanalesNoRevestidos">Diseño de Canales No Revestidos </Link></DropdownItem>
                    </DropdownMenu>                  
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Flujo Crítico
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem> <Link to="/flujocritico/profundidadcritica/canalrectangular">Profundidad Crítica Yc </Link></DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default NavHeader;