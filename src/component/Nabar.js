import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Nabar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="/">Numer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Root of equations" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Bisec">Bisection</NavDropdown.Item>
                        <NavDropdown.Item href="/falseposition">False-Position</NavDropdown.Item>
                        <NavDropdown.Item href="/onepoint">One-point Iteration</NavDropdown.Item>
                        <NavDropdown.Item href="/newton">Newton-Rapshon</NavDropdown.Item>
                        <NavDropdown.Item href="/secant">Scant</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Nabar;