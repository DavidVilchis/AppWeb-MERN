//Importar dependencias necesarias
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import Swal from "sweetalert2";

//Importar hoja de estilos
import './loginForm.css'

//Componente principal a renderizar
const LoginForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const handleClickSignIn = async () => {
        if (!data.email || !data.password) {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'Ingresa el correo electrónico y/o la contraseña para continuar.',
                icon: 'warning',
                confirmButtonText: 'Accept'
            })
        }
        else{
            data.email = data.email.trim();
            data.password = data.password.trim();
            const headersConfig = {
                'Accept': 'application/json'
            }
            await axios.post(
                "http://localhost:3000/signin", 
                data,
                {headers: headersConfig}
            ).then(response =>{
                Swal.fire({
                    title: '¡Credenciales correctas!',
                    text: response.data.msj,
                    icon: 'success',
                    confirmButtonText: 'Accept'
                }).finally(()=>{
                    localStorage.setItem("loggedUser", JSON.stringify({email: data.email, token: response.data.token}));
                    navigate("/home");
                })
            }
            ).catch(error => {
                Swal.fire({
                    title: '¡Error!',
                    text:error.response.data.msj,
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
                        <h2>Login</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <Form>
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
                                <Button onClick={handleClickSignIn} variant="secondary">
                                    Ingresar
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default LoginForm;