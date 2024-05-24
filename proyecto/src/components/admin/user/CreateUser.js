import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../Container';

const URI = 'http://localhost:8000/usuarios/'

const CreateUser = () => {
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [idRol, setIdRol] = useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        try {
            const usuario = {
                nombre,
                correo,
                contrasena,
                idRol: parseInt(idRol)
            };
            await axios.post(URI, usuario);
            navigate('/usuarios');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    }

    return (
        <Container>
            <h1>Create User</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <br />
                    <input
                        value={nombre} onChange={(e) => setNombre(e.target.value)}
                        type="text" className='form-control' />
                    <br />
                    <label className='form-label'>Correo</label>
                    <br />
                    <input
                        value={correo} onChange={(e) => setCorreo(e.target.value)}
                        type="text" className='form-control' />
                    <br />
                    <label className='form-label'>Contrasena</label>
                    <br />
                    <input
                        value={contrasena} onChange={(e) => setContrasena(e.target.value)}
                        type="password" className='form-control' />
                    <br />
                    <label className='form-label'>Rol</label>
                    <br />
                    <input
                        value={idRol} onChange={(e) => setIdRol(e.target.value)}
                        type="text" className='form-control' />
                </div>
                <button type="submit" className='btn btn-primary'>Enviar</button>
            </form>
        </Container>
    )
}

export default CreateUser;
