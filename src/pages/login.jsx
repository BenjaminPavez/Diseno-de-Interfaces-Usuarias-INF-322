import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // Hook para redirigir

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        // Validacion con usuario de prueba
        if (email === 'test@test.cl' && password === '123') {
            toast.success("Inicio de sesión exitoso", {
              duration: 1500,
            })
            // manda a home page
            navigate('/');
        } else {
          toast.error('Credenciales incorrectas',{
            duration: 1500,
          });
          console.error("Error con credenciales");
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