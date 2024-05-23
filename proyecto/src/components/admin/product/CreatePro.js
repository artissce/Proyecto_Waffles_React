import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:8000/producto/'
const URI_ING = 'http://localhost:8000/ing/'

const CreatePro = () => {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [categoria, setCategoria] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [cantIng, setCantIng] = useState(1)
    const [ingredientes, setIngredientes] = useState([''])
    const [ingredientesList, setIngredientesList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getIngredientesList()
    }, [])

    const getIngredientesList = async () => {
        try {
            const res = await axios.get(URI_ING)
            console.log("Lista de ingredientes:", res.data) // Verificar que los datos se reciban correctamente
            setIngredientesList(res.data)
        } catch (error) {
            console.error("Error al obtener los ingredientes:", error)
        }
    }

    const handleIngredientChange = (index, value) => {
        const newIngredientes = [...ingredientes]
        newIngredientes[index] = value
        setIngredientes(newIngredientes)
    }

    const addIngredientField = () => {
        setCantIng(cantIng + 1)
        setIngredientes([...ingredientes, ''])
    }

    const removeIngredientField = (index) => {
        const newIngredientes = [...ingredientes]
        newIngredientes.splice(index, 1)
        setIngredientes(newIngredientes)
        setCantIng(cantIng - 1)
    }

    const store = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI, {
                nombre: nombre,
                precio: precio,
                categoria: categoria,
                descripcion: descripcion,
                cantIng: cantIng,
                ingredientes: ingredientes,
            })
            navigate('admin/producto')
        } catch (error) {
            console.error("Error al crear el producto:", error)
        }
    }

    return (
        <div align='center'>
            <h1>Crear Producto</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Precio</label>
                    <input
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Categoría</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className='form-control'
                    >
                        <option value='Postre'>Postre</option>
                        <option value='Bebida Fría'>Bebida Fría</option>
                        <option value='Bebida Caliente'>Bebida Caliente</option>
                        <option value='Platillo'>Platillo</option>
                        <option value='Desayuno'>Desayuno</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className='form-control'
                    ></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Cantidad de Ingredientes</label>
                    <button type='button' onClick={addIngredientField} className='btn btn-success ml-2'>+</button>
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
                <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    )
}

export default CreatePro
