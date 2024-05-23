import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ING_URI = 'http://localhost:8000/ing/';
const TIPOS_URI = 'http://localhost:8000/tipo/';

const EditIng = () => {
    const [nombre, setNombre] = useState('');
    const [idTipo, setIdTipo] = useState('');
    const [tipos, setTipos] = useState([]);
    const navigate = useNavigate();
    const { idIng } = useParams();

    // Fetch tipos and current ingredient data on mount
    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await axios.get(TIPOS_URI);
                setTipos(response.data);
            } catch (error) {
                console.error('Error fetching tipos:', error);
            }
        };

        const getIngById = async () => {
            try {
                const res = await axios.get(ING_URI + idIng);
                setNombre(res.data.nombre);
                setIdTipo(res.data.idTipo);
            } catch (error) {
                console.error('Error fetching ingrediente:', error);
            }
        };

        fetchTipos();
        getIngById();
    }, [idIng]);

    // Handle form submission
    const update = async (e) => {
        e.preventDefault();
        try {
            const url = ING_URI + idIng; // Agrega esta línea para imprimir la URL
            console.log("URL de la solicitud PUT:", url);
            await axios.put(ING_URI + idIng, {nombre:nombre,idTipo:idTipo});
            navigate('/admin/ing');
        } catch (error) {
            console.error('Error updating ingrediente:', error);
        }
    };

    return (
        <div align='center'>
            <h1>Edit Ingrediente</h1>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <br/>
                    <input 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        type="text" 
                        className='form-control' 
                    />
                    <br/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Tipo</label>
                    <br/>
                    <select 
                        value={idTipo} 
                        onChange={(e) => setIdTipo(e.target.value)} 
                        className='form-control'
                    >
                        <option value="">Seleccione un tipo</option>
                        {tipos.map(tipo => (
                            <option key={tipo.idTipo} value={tipo.idTipo}>
                                {tipo.nombreTipo}
                            </option>
                        ))}
                    </select>
                    <br/>
                </div>
                <button type="submit" className='btn btn-primary'>Update</button>
            </form>
        </div>
    );
}

export default EditIng;
