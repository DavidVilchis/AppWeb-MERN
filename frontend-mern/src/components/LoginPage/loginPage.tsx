//Importar las dependencias necesarias
import React from "react";

//Importar el componente a renderizar en la página principal
import NavbarComponent from "../NavbarComponent/navbarComponent";
import LoginForm from "./loginForm";

const LoginPage = () => {
    return (
        <>
            <NavbarComponent />
            <LoginForm />
        </>
    );
}
export default LoginPage;