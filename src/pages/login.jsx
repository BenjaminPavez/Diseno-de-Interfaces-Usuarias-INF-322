import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //e.target.email == "test@test.cl"
            //e.target.name == "user"
            console.log("Exitoso");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="login-titulo">MuniDenuncia</h1>
            <div className="login-container">
                <div className="login-card">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleInputChange} />
                        <input type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} />
                        <button className="login-button" type="submit">Iniciar Sesión</button>
                    </form>
                </div>
                
                <div className="register-card">
                    <h2>¿Eres nuevo en el sitio?</h2>
                    <p>¡Registrate ya!</p>
                    <Link to="/register">
                        <button>Crear Cuenta</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;