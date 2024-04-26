import axios from 'axios'
import {useState, useEffect} from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const URI = 'http://localhost:8000/usuarios/'

const ShowUser = () => {
    const [User,setUser]=useState([])
    useEffect(()=>{//utilizar efecto, referente a que react no contUsera
        getUser()
    },[])
    //procedimiento para mostrar todos los pedidos
    const getUser = async () =>{
        const res = await axios.get(URI)
        setUser(res.data)
    }

    //proc para eliminar un pedido
    const deleteUser = async(idUsuario) => {
        await axios.delete(`${URI}${idUsuario}`)
        getUser()
    }
    //proc crear
    return(
    <div className='container-fluid d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-10'>
                    <Link to="/usuarios/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '20%' }}>idUsuario</th>
                                    <th scope="col" style={{ width: '15%' }}>Nombre del User</th>
                                    <th scope="col" style={{ width: '15%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {User.map ((User)=>(
                                    <tr key={User.idUsuario}>
                                        <td>{User.idUsuario} </td>
                                        <td>{User.nombre} </td>
                                        <td>
                                            <Link to={`/usuarios/edit/${User.idUsuario}`} className='btn btn-info'> <i className="fas fa-edit"></i></Link>
                                            <button onClick={()=>deleteUser(User.idUsuario)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
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
export default ShowUser