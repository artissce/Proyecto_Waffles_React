import './Formulario.css'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

export function Formulario({setUsuario}){
    const [user,setUser]=useState("");
    const [pwd,setPwd]=useState("");
    const [error,setError]=useState(false);
    const navigate = useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(user==="" || pwd === ""){
            setError(true)
            return
        }
        setError(false)//regresar sin el cartel
        //setUsuario([user])
        try {
            const response = await axios.post('http://localhost:8000/usuarios/correo', { email: user, password: pwd });
            if (response.status === 200) {
                // Autenticación exitosa, redirigir al usuario a la página correspondiente
                if (response.data.idRol === 1) {
                    navigate('./admin/HomeAdmin');
                } else if (response.data.idRol === 2) {
                    navigate('/home/Home');
                }
            } else {
                setError(true); // Mostrar mensaje de error si la autenticación falla
            }
        } catch (error) {
            console.error("Error de autenticación:", error);
            setError(true); // Mostrar mensaje de error si hay un problema con la solicitud
        }
    }
    return(
        <section >
            <div className="alert-container">
            {error && (
                <div className="alert-container">
                <Alert variant="danger" onClose={() => setError(false)} dismissible>
                    Todos los campos son obligatorios
                </Alert>
                </div>
            )}
            </div>
            <div className="form-container">
                <form className='formulario' onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label forhtml="text">Usuario </label>
                        <br/>
                        <input type="text" className="form-control" value={user} onChange={e=>setUser(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label forhtml="pwd">Contraseña </label>
                        <br/>
                        <input type="password" className="form-control" value={pwd} onChange={e=>setPwd(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-default">Iniciar</button>
                </form>
            </div>
            
        </section>
    )
}