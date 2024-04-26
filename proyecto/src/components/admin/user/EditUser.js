import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const URI = 'http://localhost:8000/usuarios/'


const EditUser = ()=>{
    const [nombre,setNombre]=useState('')
    const [correo,setCorreo]=useState('')
    const [contrasena,setContrasena]=useState('')
    const navigate = useNavigate()
    const {idUser}= useParams()
    //guardar
    const update = async (e) => {
        e.preventDefault();
        const url = URI + idUser; // Agrega esta línea para imprimir la URL
        console.log("URL de la solicitud PUT:", url);
        try {
            await axios.put(URI+ idUser, { nombre:nombre,correo:correo,contrasena:contrasena });
            navigate('/usuarios'); // Navegar de regreso al listado después de la actualización
        } catch (error) {
            console.error("Error al actualizar el User:", error);
        }
    };

    useEffect(()=>{
        getUserById()
    },[])

    const getUserById = async()=>{
        const res=await axios.get(URI+idUser)
        setNombre(res.data.nombre)
        setCorreo(res.data.correo)
        setContrasena(res.dara.contrasena)
    }

    return(
        <div>
            <h1>Edit User</h1>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form=label'>Nombre del User   </label>
                    <br/>
                    <input 
                        value={nombre} onChange={(e)=>setNombre(e.target.value)} 
                        type="text" className='form-contUser'/>
                    <br/>
                    <label className='form=label'>Correo   </label>
                    <br/>
                    <input 
                        value={correo} onChange={(e)=>setCorreo(e.target.value)} 
                        type="text" className='form-contUser'/>
                    <br/>
                    <label className='form=label'>Contrasena   </label>
                    <br/>
                    <input 
                        value={contrasena} onChange={(e)=>setContrasena(e.target.value)} 
                        type="password" className='form-contUser'/>
                    
                </div>
                    
                <button type="submit" className='btn btn-primary'>Update</button>
                
            </form>
        </div>
    )
}

export default EditUser 