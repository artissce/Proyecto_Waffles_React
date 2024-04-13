import axios from 'axios'
import {useState, useEffect} from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const URI = 'http://localhost:8000/roles/'

const ShowRol = () => {
    const [rol,setRol]=useState([])
    useEffect(()=>{//utilizar efecto, referente a que react no controla
        getRol()
    },[])
    //procedimiento para mostrar todos los pedidos
    const getRol = async () =>{
        const res = await axios.get(URI)
        setRol(res.data)
    }

    //proc para eliminar un pedido
    const deleteRol = async(idRol) => {
        await axios.delete(`${URI}${idRol}`)
        getRol()
    }
    //proc crear
    return(
    <div className='container-fluid d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-10'>
                    <Link to="/roles/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '20%' }}>idRol</th>
                                    <th scope="col" style={{ width: '15%' }}>Nombre del rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rol.map ((rol)=>(
                                    <tr key={rol.idRol}>
                                        <td>{rol.idRol} </td>
                                        <td>{rol.nombreRol} </td>
                                        <td>
                                            <Link to={`/roles/edit/${rol.idRol}`} className='btn btn-info'> <i className="fas fa-edit"></i></Link>
                                            <button onClick={()=>deleteRol(rol.idRol)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
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
export default ShowRol