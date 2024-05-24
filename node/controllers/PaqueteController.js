import PaqueteModel from "../models/PaqueteModel.js";
import ProductoModel from "../models/ProductoModel.js";
import Producto_PaqueteModel from "../models/Producto_PaqueteModel.js"
import db from '../database/db.js';
/*METODOS PARA EL CRUD */

// Obtener todos los paquetes con productos asociados
export const getAllPaquete = async (req, res) => {
    try {
        const paquetes = await PaqueteModel.findAll({
            attributes: ['idPaquete', 'nombre', 'precio', 'descripcion', 'cantidadProducto'],
            include: [
                {
                    model: ProductoModel,
                    as: 'assignedPro',
                    through: 'producto_paquete',
                    attributes: ['idProducto', 'nombre', 'categoria'],
                }
            ]
        });
        res.json(paquetes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Obtener un paquete específico con productos asociados
export const getPaquete = async (req, res) => {
    try {
        const paquete = await PaqueteModel.findOne({
            where: { idPaquete: req.params.idPaquete },
            attributes: ['idPaquete', 'nombre', 'precio', 'descripcion', 'cantidadProducto'],
            include: [
                {
                    model: ProductoModel,
                    as: 'assignedPro',
                    through: 'producto_paquete',
                    attributes: ['idProducto', 'nombre', 'categoria'],
                }
            ]
        });

        if (!paquete) {
            return res.status(404).json({ message: 'Paquete not found' });
        }

        res.json(paquete);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//crear un registro
export const createPaquete = async (req, res) => {
    try {
        const { nombre, precio, descripcion, cantidadProducto, productos } = req.body;
        const paqueteData = {
            nombre,
            precio,
            descripcion,
            cantidadProducto,
        };

        // Crea el paquete en la tabla de paquetes
        const paquete = await PaqueteModel.create(paqueteData);

        // Verifica si se proporcionó una lista de productos para el paquete
        if (productos && Array.isArray(productos) && productos.length > 0) {
            // Asocia cada producto al paquete con su cantidad respectiva
            for (const producto of productos) {
                const { idProducto, cantidad } = producto;
                //await paquete.addAssignedPro(idProducto, { through: { cantidad } });
                await Producto_PaqueteModel.create({
                    idProducto,
                    idPaquete: paquete.idPaquete, // Utiliza el id del paquete recién creado
                    cantidad,
                });
            }
        }

        res.json({ message: 'Registro de paquete correctamente', newPaquete: paquete.toJSON() });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Captura errores de validación específicos de Sequelize
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ message: 'Errores de validación:', errors });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
    
};
//actualizar un registro
export const updatePaquete = async (req, res) => {
    try {
        const idPaquete = req.params.idPaquete; // Nota: Cambiado para asegurar que el idPaquete se obtenga correctamente
        const { nombre, precio, descripcion, cantidadProducto, productos } = req.body;

        // Verifica si idPaquete se recupera correctamente
        if (!idPaquete) {
            return res.status(400).json({ message: 'Falta idPaquete en los parámetros de la solicitud' });
        }

        // Mostrar el idPaquete en la consola para depuración
        console.log(`idPaquete recibido: ${idPaquete}`);

        // Construir el objeto de datos a actualizar para el paquete
        const updatedData = {};
        if (nombre) updatedData.nombre = nombre;
        if (precio) updatedData.precio = precio;
        if (descripcion) updatedData.descripcion = descripcion;
        if (cantidadProducto) updatedData.cantidadProducto = cantidadProducto;

        // Realizar la actualización en la base de datos para el paquete
        const [updatedCount] = await PaqueteModel.update(updatedData, {
            where: { idPaquete: idPaquete }
        });

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'Paquete no encontrado' }); // Manejar cuando no se encuentra el registro
        }

        // Obtener el paquete actualizado
        const updatedPaquete = await PaqueteModel.findByPk(idPaquete);

        // Actualizar las relaciones con productos si se proporcionan en la solicitud
        if (productos && Array.isArray(productos) && productos.length > 0) {
            // Limpiar las relaciones existentes
            await Producto_PaqueteModel.destroy({ where: { idPaquete: idPaquete } });

            // Establecer las nuevas relaciones con productos
            for (const producto of productos) {
                await Producto_PaqueteModel.create({
                    idProducto: producto.idProducto,
                    idPaquete: idPaquete,
                    cantidad: producto.cantidad,
                });
            }
        }

        res.json({ message: 'Actualización de paquete correcta' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





//elminar un registro
export const deletePaquete = async (req, res) => {
    try {
        const idPaquete = req.params.idPaquete; // Obtener el ID del paquete de los parámetros de la solicitud
        const paquete = await PaqueteModel.findOne({
            where: { idPaquete: idPaquete },
            include: [
                {
                    model: ProductoModel,
                    as: 'assignedPro', // Nombre de la relación con ProductoModel
                    through: 'producto_paquete',
                }
            ]
        });

        if (!paquete) {
            return res.status(404).json({ "message": "Paquete no encontrado" });
        }

        // Eliminar la asociación con productos antes de eliminar el paquete
        await Producto_PaqueteModel.destroy({ where: { idPaquete: idPaquete } });

        // Eliminar el paquete
        await PaqueteModel.destroy({ where: { idPaquete: idPaquete } });


        res.json({ "message": "Borrado de paquete correcto" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
