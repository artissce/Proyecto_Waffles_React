import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Container from '../Container';
const URI = 'http://localhost:8000/pedidos/'


const EditPedido = ()=>{
    const [cliente,setCliente]=useState('')
    const [paquete,setPaquete]=useState('')
    const [estado,setEstado]=useState('')
    const navigate = useNavigate()
    const {idPedido}= useParams()
    console.log("Valor de idPedido:", idPedido); // Verificar el valor de idPedido

    //guardar
    const update = async (e) => {
        e.preventDefault();
        const url = URI + idPedido; // Agrega esta línea para imprimir la URL
        console.log("URL de la solicitud PUT:", url);
        try {
            await axios.put(URI+ idPedido, { cliente: cliente, paquete: paquete, estado: estado });
            navigate('/'); // Navegar de regreso al listado después de la actualización
        } catch (error) {
            console.error("Error al actualizar el pedido:", error);
        }
    };

    useEffect(()=>{
        getPedidoById()
    },[])

    const getPedidoById = async()=>{
        const res=await axios.get(URI+idPedido)
        setCliente(res.data.cliente)
        setPaquete(res.data.paquete)
        setEstado(res.data.estado)
    }

    return(
        <Container>
        <div>
            <h1>Editar pedido</h1>
            <br></br>
            <form onSubmit={update}>
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
                    
                <button type="submit" >Update</button>
                
            </form>
            <br></br>
            <Link to="/home/pedido" className='btn btn-secondary mt-2'>Regresar</Link>
        </div>
        </Container>
    )
}

export default EditPedido 