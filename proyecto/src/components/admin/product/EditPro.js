import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from '../../Container';

const URI = 'http://localhost:8000/producto/';
const URI_ING = 'http://localhost:8000/ing/';

const EditPro = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantIng, setCantIng] = useState(1);
    const [ingredientes, setIngredientes] = useState(['']);
    const [ingredientesList, setIngredientesList] = useState([]);
    const navigate = useNavigate();
    const { idProducto } = useParams();

    useEffect(() => {
        getProById();
    }, []);

    const getProById = async () => {
        try {
            const res = await axios.get(URI + idProducto);
            const pro = res.data;
            setNombre(pro.nombre);
            setPrecio(pro.precio);
            setCategoria(pro.categoria);
            setDescripcion(pro.descripcion);
            setCantIng(pro.cantIng);
            setIngredientes(pro.ingredientes.map(ing => ing.idIng)); // Get only ingredient IDs
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const getIngredientesList = async () => {
        try {
            const res = await axios.get(URI_ING);
            console.log("Lista de ingredientes:", res.data); // Verify ingredient data
            setIngredientesList(res.data);
        } catch (error) {
            console.error("Error fetching ingredientes:", error);
        }
    };

    useEffect(() => {
        getIngredientesList();
    }, []);

    const handleIngredientChange = (index, value) => {
        const newIngredientes = [...ingredientes];
        newIngredientes[index] = value;
        setIngredientes(newIngredientes);
    };

    const addIngredientField = () => {
        setCantIng(cantIng + 1);
        setIngredientes([...ingredientes, '']);
    };

    const removeIngredientField = (index) => {
        const newIngredientes = [...ingredientes];
        newIngredientes.splice(index, 1);
        setIngredientes(newIngredientes);
        setCantIng(cantIng - 1);
    };

    const updatePro = async (e) => {
        e.preventDefault();
        try {
            await axios.put(URI + idProducto, {
                nombre,
                precio,
                categoria,
                descripcion,
                cantIng,
                ingredientes,
            });
            navigate('/admin/producto');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Container>
        <div align='center'>
            <h1>Editar Producto</h1>
            <form onSubmit={updatePro}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre del Producto</label>
                    <br/>
                    <input 
                        value={nombre} onChange={(e) => setNombre(e.target.value)} 
                        type="text" className='form-control' />
                    <br/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Precio</label>
                    <br/>
                    <input 
                        value={precio} onChange={(e) => setPrecio(e.target.value)} 
                        type="text" className='form-control' />
                    <br/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Categoría</label>
                    <br/>
                    <select 
                        value={categoria} onChange={(e) => setCategoria(e.target.value)} 
                        className='form-select'>
                        <option value="Postre">Postre</option>
                        <option value="Bebida Fría">Bebida Fría</option>
                        <option value="Bebida Caliente">Bebida Caliente</option>
                        <option value="Platillo">Platillo</option>
                        <option value="Desayuno">Desayuno</option>
                    </select>
                    <br/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Descripción</label>
                    <br/>
                    <input 
                        value={descripcion} onChange={(e) => setDescripcion(e.target.value)} 
                        type="text" className='form-control' />
                    <br/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Cantidad de Ingredientes</label>
                    <br/>
                    <button type='button' onClick={addIngredientField} className='btn btn-success ml-2'>+</button>
                    <br/>
                    <br/>
                    {Array.from({ length: cantIng }).map((_, index) => (
                        <div key={index} className='input-group mb-3'>
                            <select
                                value={ingredientes[index] || ''}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                className='form-control'
                            >
                                <option value='' disabled>Selecciona un ingrediente</option>
                                {ingredientesList.map(ing => (
                                    <option key={ing.idIng} value={ing.idIng}>{ing.nombre}</option>
                                ))}
                            </select>
                            <button type='button' onClick={() => removeIngredientField(index)} className='btn btn-danger'>-</button>
                        </div>
                    ))}
                </div>
                <button type="submit" >Actualizar</button>
            </form>
            <br></br>
            <Link to="/admin/producto" className='btn btn-secondary mt-2'>Regresar</Link>
        </div></Container>
    );
};

export default EditPro;
