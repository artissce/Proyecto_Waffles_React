import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../Container';
import { Link } from 'react-router-dom';
const ING_URI = 'http://localhost:8000/ing/';
const TIPOS_URI = 'http://localhost:8000/tipo/';

const CreateIng = () => {
    const [nombre, setNombre] = useState('');
    const [idTipo, setIdTipo] = useState('');
    const [tipos, setTipos] = useState([]);
    const navigate = useNavigate();

    // Fetch tipos on mount
    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await axios.get(TIPOS_URI);
                setTipos(response.data);
            } catch (error) {
                console.error('Error fetching tipos:', error);
            }
        };
        fetchTipos();
    }, []);

    // Handle form submission
    const store = async (e) => {
        e.preventDefault();
        try {
            const ing = {
                nombre: nombre,
                idTipo: idTipo
            };
            await axios.post(ING_URI, ing);
            navigate('/admin/ing');
        } catch (error) {
            console.error('Error creating ingrediente:', error);
        }
    };

    return (
        <Container>
        <div align='center'>
            <h1>Create Ingrediente</h1>
            <form onSubmit={store}>
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
                <button type="submit">Enviar</button>
            </form>
            <br></br>
            <Link to="/admin/ing" className='btn btn-secondary mt-2'>Regresar</Link>
        </div></Container>
    );
}

export default CreateIng;
