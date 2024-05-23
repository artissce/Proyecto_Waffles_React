import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:8000/tipo/'


const CreateTI = ()=>{
    const [nombreTipo,setNombreTipo]=useState('')
    const navigate = useNavigate()

    //guardar
    const store = async(e)=>{
        e.preventDefault()
        try {
            const tipo = {
                nombreTipo: nombreTipo
            };
            await axios.post(URI, tipo);
            navigate('/tipo');
        } catch (error) {
            console.error('Error al crear el tipo:', error);
        }
    }

    return(
        <div align='center' >
            <h1>Create tipo</h1>
            <form onSubmit={store} >
                <div className='mb-3'>
                    <label className='form=label'>Nombre</label>
                    <br/>
                    <input 
                        value={nombreTipo} onChange={(e)=>setNombreTipo(e.target.value)} 
                        type="text" className='form-contUser'/>
                    <br/>
                </div>
                    
                <button type="submit" className='btn btn-primary'>Enviar</button>
                
            </form>
        </div>
    )
}

export default CreateTI 