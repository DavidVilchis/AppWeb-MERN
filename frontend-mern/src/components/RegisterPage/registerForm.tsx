
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

//Importar la hoja de estilos
import './registerForm.css'

const RegisterForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: ''
    })
    const handleClickSignUp = async () => {
        if (!data.name || !data.lastname || !data.email || !data.password) {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'Ingresa todos los datos para continuar.',
                icon: 'warning',
                confirmButtonText: 'Accept'
            })
        }
        else {
            data.name = data.name.trim();
            data.lastname = data.lastname.trim();
            data.email = data.email.trim();
            data.password = data.password.trim();
            const headersConfig = {
                'Accept': 'application/json'
            }
            await axios.post(
                "http://localhost:3000/signup",
                data,
                { headers: headersConfig }
            ).then(response => {
                Swal.fire({
                    title: '¡Registro exitoso!',
                    text: response.data.msj,
                    icon: 'success',
                    confirmButtonText: 'Accept'
                }).finally(() =>{
                    navigate('/');
                })
            }
            ).catch(error => {
                Swal.fire({
                    title: '¡Error!',
                    text: error.response.data.msj,
                    icon: 'error',
                    confirmButtonText: 'Accept'
                })
            })
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return (
        <div className="main">
            <Container className="mt-5 p-5" style={{ borderRadius: '30px', width: '50%', backgroundColor: '#d5d9dd' }}>
                <Row className="justify-content-md-center">
                    <Col>
                        <h2>Register</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicInformation">
                                <Row>
                                    <Col>
                                        <Form.Label>Nombre(s):</Form.Label>
                                        <Form.Control type="text" name="name" onChange={handleInputChange} placeholder='Nombre completo' />
                                    </Col>
                                    <Col>
                                        <Form.Label>Apellidos:</Form.Label>
                                        <Form.Control type="text" name="lastname" onChange={handleInputChange} placeholder='Apellidos completos' />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Correo electrónico:</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleInputChange} placeholder="user@example.com" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Contraseña" />
                            </Form.Group>
                            <div className="div-button-form">
                                <Button onClick={handleClickSignUp} variant="secondary">
                                    Registrar
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RegisterForm;