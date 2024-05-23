import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/tipo/'

const ShowTI = () => {
    const [Tipo,setTipo]=useState([])
    useEffect(()=>{//utilizar efecto, referente a que react no contUsera
        getTipo()
    },[])
    //procedimiento para mostrar todos los pedidos
    const getTipo = async () =>{
        const res = await axios.get(URI)
        setTipo(res.data)
    }

    //proc para eliminar un pedido
    const deleteTipo = async(idTipo) => {
        await axios.delete(`${URI}${idTipo}`)
        getTipo()
    }
    //proc crear
    return(
    <div className='container-fluid d-flex justify-content-center align-items-center 'align='center' style={{ minHeight: '80vh' }}>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-10'>
                    <Link to="/tipo/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '20%' }}>idTipo</th>
                                    <th scope="col" style={{ width: '15%' }}>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Tipo.map ((Tipo)=>(
                                    <tr key={Tipo.idTipo}>
                                        <td>{Tipo.idTipo} </td>
                                        <td>{Tipo.nombreTipo} </td>
                                        <td>
                                            <Link to={`/tipo/edit/${Tipo.idTipo}`} className='btn btn-info'> <i className="fas fa-edit"></i></Link>
                                            <button onClick={()=>deleteTipo(Tipo.idTipo)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
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
export default ShowTI