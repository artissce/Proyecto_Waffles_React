import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../../Container';

import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/usuarios/'

const EditUser = () => {
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const navigate = useNavigate()
    const { idUser } = useParams()

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(URI + idUser, { nombre, correo, contrasena });
            navigate('/usuarios');
        } catch (error) {
            console.error("Error al actualizar el User:", error);
        }
    };

    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async () => {
        const res = await axios.get(URI + idUser)
        setNombre(res.data.nombre)
        setCorreo(res.data.correo)
        setContrasena(res.data.contrasena)
    }

    return (
        <Container>
            <h1>Edit User</h1>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre del User</label>
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
                </div>
                <button type="submit" >Update</button>
            </form>
            <Link to="/admin/usuarios/" className='btn btn-secondary mt-2'>Regresar</Link>
        </Container>
    )
}

export default EditUser;
