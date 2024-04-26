import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:8000/usuarios/'


const CreateUser = ()=>{
    const [nombreUser,setNombreUser]=useState('')

    const navigate = useNavigate()

    //guardar
    const store = async(e)=>{
        e.preventDefault()
        await axios.post(URI,{nombreUser:nombreUser})
        navigate('/usuarios')
    }

    return(
        <div>
            <h1>Create User</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form=label'>User</label>
                    <input 
                        value={nombreUser} onChange={(e)=>setNombreUser(e.target.value)} 
                        type="text" className='form-contUser'/>
                </div>
                    
                <button type="submit" className='btn btn-primary'>Enviar</button>
                
            </form>
        </div>
    )
}

export default CreateUser 