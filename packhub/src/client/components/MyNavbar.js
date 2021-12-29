import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {FaUser} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

export default function MyNavbar({currentUser, pageTitle}) {
    const history = useHistory();
    return (<>
        <Navbar collapseOnSelect fixed='top' expand='md' bg='dark' variant='dark'>
            <Container >
                <Navbar.Brand>PackHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-between" >
                    <Nav>
                        <NavDropdown title="My Packs" menuVariant="dark">
                            <NavDropdown.Item onClick={() => history.push('/mypacks')}>View My Packs</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push('/createpack')}>Create a Pack</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push('/joinpack')}>Join a Pack</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={() => history.push('/settings')}>Settings</Nav.Link>
                    </Nav>
                    <div className="dropdown-divider"></div>
                    <Navbar.Text><FaUser size={16} style={{paddingRight: "5px"}}/>{currentUser.displayName}</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <h1 style={{marginTop: 100, marginLeft: 30, color: "darkred"}}>{pageTitle}</h1>
    </>)
}
