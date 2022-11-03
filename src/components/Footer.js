import React from 'react';
import { Navbar, Container,NavbarBrand} from 'reactstrap';

const Footer = () => {
  return (
    <div>
        <Navbar color="primary" dark className='mt-4'style={{'height':'4rem',}}>
                <Container>
                    <NavbarBrand>Footer</NavbarBrand>
                </Container>
        </Navbar>
    </div>
  )
}

export default Footer