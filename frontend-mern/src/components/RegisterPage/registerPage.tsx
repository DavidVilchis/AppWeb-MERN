//Importar las dependencias necesarias
import React from 'react';

//Importar los componentes para renderizar
import NavbarComponent from '../NavbarComponent/navbarComponent';
import RegisterForm from './registerForm';
const RegisterPage = () => {
    return(
        <>
            <NavbarComponent />
            <RegisterForm />
        </>
    );
}

export default RegisterPage;