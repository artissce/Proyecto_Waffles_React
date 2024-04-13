import axios from 'axios'
import {useState, useEffect} from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const URI = 'http://localhost:8000/pedidos/'

const ShowPedidos = () => {
    const [pedidos,setPedidos]=useState([])
    useEffect(()=>{//utilizar efecto, referente a que react no controla
        getPedidos()
    },[])
    //procedimiento para mostrar todos los pedidos
    const getPedidos = async () =>{
        const res = await axios.get(URI)
        setPedidos(res.data)
    }

    //proc para eliminar un pedido
    const deletePedidos = async(idPedido) => {
        await axios.delete(`${URI}${idPedido}`)
        getPedidos()
    }
    //proc crear
    return(
    <div className='container-fluid d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-10'>
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '20%' }}>Cliente</th>
                                    <th scope="col" style={{ width: '15%' }}>Fecha</th>
                                    <th scope="col" style={{ width: '10%' }}>Hora</th>
                                    <th scope="col" style={{ width: '25%' }}>Paquete</th>
                                    <th scope="col" style={{ width: '15%' }}>Estado</th>
                                    <th scope="col" style={{ width: '15%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.map ((pedido)=>(
                                    <tr key={pedido.idPedido}>
                                        <td>{pedido.cliente} </td>
                                        <td>{pedido.fecha} </td>
                                        <td>{pedido.hora} </td>
                                        <td>{pedido.paquete} </td>
                                        <td>{pedido.estado} </td>
                                        <td>
                                            <Link to={`/edit/${pedido.idPedido}`} className='btn btn-info'> <i className="fas fa-edit"></i></Link>
                                            <button onClick={()=>deletePedidos(pedido.idPedido)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShowPedidos