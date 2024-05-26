import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../Container';
import { Link } from 'react-router-dom';
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
        <Container>
        <div>
            <h1>Create User</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form=label'>User</label>
                    <br></br>
                    <input 
                        value={nombreUser} onChange={(e)=>setNombreUser(e.target.value)} 
                        type="text" className='form-contUser form-control'/>
                </div>
                    
                <button type="submit" >Enviar</button>
                
            </form>
            <br></br>
            <Link to="/admin/roles" className='btn btn-secondary mt-2'>Regresar </Link>
        </div>
        </Container>
    )
}

export default CreateUser 