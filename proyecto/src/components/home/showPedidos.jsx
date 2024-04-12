import axios from 'axios'//nos conecta a backend
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const URI = 'http://localhost:8000/pedidos/'

const ShowPedidos = () => {
    const [pedidos,setPedidos]=useState([])
    useEffect(()=>{//utilizar efecto, referente a que react no controla
        getPedidos()
    },[])
    //procedimiento para mostrar todos los pedidos
    const getPedidos = async()=>{
        const res = await axios.get(URI)//axios da un objeto de resultados
        setPedidos(res.data)
    }

    //proc para eliminar un pedido
    const deletePedidos = async(idPedido) => {
        axios.delete(`${URI}${idPedido}`)
        getPedidos()
    }
    //proc crear
    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <table className='table-primary'>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Paquete</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map ((pedido)=>(
                                <tr key={pedido.idPedido}>
                                    <td>{pedido.fecha} </td>
                                    <td>{pedido.hora} </td>
                                    <td>{pedido.paquete} </td>
                                    <td>{pedido.estado} </td>
                                    <td>
                                        <Link to={`/edit/${pedido.idPedido}`} className='btn btn-info'> Editar</Link>
                                        <button onClick={()=>deletePedidos(pedido.idPedido)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ShowPedidos