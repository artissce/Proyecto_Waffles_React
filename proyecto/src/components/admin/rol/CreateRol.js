import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:8000/roles/'


const CreateRol = ()=>{
    const [nombreRol,setNombreRol]=useState('')

    const navigate = useNavigate()

    //guardar
    const store = async(e)=>{
        e.preventDefault()
        await axios.post(URI,{nombreRol:nombreRol})
        navigate('/roles')
    }

    return(
        <div>
            <h1>Create rol</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form=label'>Rol</label>
                    <input 
                        value={nombreRol} onChange={(e)=>setNombreRol(e.target.value)} 
                        type="text" className='form-control'/>
                </div>
                    
                <button type="submit" className='btn btn-primary'>Enviar</button>
                
            </form>
        </div>
    )
}

export default CreateRol 