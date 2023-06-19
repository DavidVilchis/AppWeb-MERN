//Importar las dependencias necesarias
import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

//Importar hoja de estilos
import './navbarComponent.css';

const NavbarComponent = () => {
    const user = localStorage.getItem("loggedUser");
    const navigate = useNavigate();
    const handleClickLogOut = () => {
        Swal.fire({
            title: 'Logout',
            text: "¿Estás seguro de cerrar sesión?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                navigate("/");
            }
        })
    }
    //Validación de si existe un usuario, esto para mostrar un Navbar distinto
    if (user) {
        let userJson = JSON.parse(user);
        return (
            <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="./images/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />{' '}
                        <label className="header-navbar">ToDo App</label>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="me-auto">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">My Tasks</Nav.Link>
                            <Nav.Link onClick={handleClickLogOut}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="justify-content-end">
                            <Navbar.Text>Signed in as: <Link to="/home">{userJson.email}</Link></Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
    else {
        return (
            <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="./images/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />{' '}
                        <label className="header-navbar">ToDo App</label>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="justify-content-end">
                            <Nav.Link as={Link} to="/">Login</Nav.Link>
                            <Navbar.Text>|</Navbar.Text>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavbarComponent;