import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:8000/usuarios/'


const CreateUser = ()=>{
    const [nombre,setNombre]=useState('')
    const [correo,setCorreo]=useState('')
    const [contrasena,setContrasena]=useState('')
    const [idRol,setIdRol]=useState('')
    const navigate = useNavigate()

    //guardar
    const store = async(e)=>{
        e.preventDefault()
        try {
            const usuario = {
                nombre: nombre,
                correo: correo,
                contrasena: contrasena,
                idRol: parseInt(idRol) // Convertir a entero
            };
            await axios.post(URI, usuario);
            navigate('/usuarios');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    }

    return(
        <div>
            <h1>Create User</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form=label'>Nombre</label>
                    <br/>
                    <input 
                        value={nombre} onChange={(e)=>setNombre(e.target.value)} 
                        type="text" className='form-contUser'/>
                    <br/>
                    <label className='form=label'>Correo</label>
                    <br/>
                    <input 
                        value={correo} onChange={(e)=>setCorreo(e.target.value)} 
                        type="text" className='form-contUser'/>
                    <br/>
                    <label className='form=label'>Contrasena</label>
                    <br/>
                    <input 
                        value={contrasena} onChange={(e)=>setContrasena(e.target.value)} 
                        type="password" className='form-contUser'/>
                    <br/>
                    <label className='form=label'>rol</label>
                    <br/>
                    <input 
                        value={idRol} onChange={(e)=>setIdRol(e.target.value)} 
                        type="text" className='form-contUser'/>
                    <br/>
                </div>
                    
                <button type="submit" className='btn btn-primary'>Enviar</button>
                
            </form>
        </div>
    )
}

export default CreateUser 