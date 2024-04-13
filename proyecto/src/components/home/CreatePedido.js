import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:8000/pedidos/'


const CreatePedido = ()=>{
    const [cliente,setCliente]=useState('')
    const [paquete,setPaquete]=useState('')
    const [estado,setEstado]=useState('')

    const navigate = useNavigate()

    //guardar
    const store = async(e)=>{
        e.preventDefault()
        await axios.post(URI,{cliente:cliente,paquete:paquete,estado:estado})
        navigate('/')
    }

    return(
        <div>
            <h1>Create pedido</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form=label'>Cliente</label>
                    <input 
                        value={cliente} onChange={(e)=>setCliente(e.target.value)} 
                        type="text" className='form-control'/>
                    
                </div>
                <div className='mb-3'>
                    <label className='form=label'>Paquete</label>
                    <input 
                        value={paquete} onChange={(e)=>setPaquete(e.target.value)} 
                        type="text" className='form-control'/>
                </div>
                <div className='mb-3'>
                <label className='form=label'>Estado</label>
                    <input 
                        value={estado} onChange={(e)=>setEstado(e.target.value)} 
                        type="text" className='form-control'/>
                </div>
                    
                <button type="submit" className='btn btn-primary'>Enviar</button>
                
            </form>
        </div>
    )
}

export default CreatePedido 