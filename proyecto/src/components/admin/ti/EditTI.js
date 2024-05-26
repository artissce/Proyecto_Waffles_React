import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Container from '../../Container';
const URI = 'http://localhost:8000/tipo/'


const EditTI = ()=>{
    const [nombreTipo,setNombreTipo]=useState('')
    const navigate = useNavigate()
    const {idTipo}= useParams()
    //guardar
    const update = async (e) => {
        e.preventDefault();
        const url = URI + idTipo; // Agrega esta línea para imprimir la URL
        console.log("URL de la solicitud PUT:", url);
        try {
            await axios.put(URI+ idTipo, { nombreTipo:nombreTipo });
            navigate('/admin/tipo'); // Navegar de regreso al listado después de la actualización
        } catch (error) {
            console.error("Error al actualizar el tipo:", error);
        }
    };

    useEffect(()=>{
        getTipoById()
    },[])

    const getTipoById = async()=>{
        const res=await axios.get(URI+idTipo)
        setNombreTipo(res.data.nombreTipo)
    }

    return(
        <Container>
        <div align='center'>
            <h1>Edit tipo ingrediente</h1>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form=label'>Nombre del tipo   </label>
                    <br/>
                    <input 
                        value={nombreTipo} onChange={(e)=>setNombreTipo(e.target.value)} 
                        type="text" className='form-control'/>
                    <br/>
                    
                </div>
                    
                <button type="submit" className='btn btn-primary'>Update</button>
                
            </form>
            <br></br>
            <Link to="/admin/tipo" className='btn btn-secondary mt-2'>Regresar al Menú Admin</Link>
        </div></Container>
    )
}

export default EditTI 