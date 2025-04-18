import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import ExcelJS from 'exceljs';

const URI = 'http://localhost:8000/pedidos/';

const ShowPedido = () => {
    const [pedidos, setPedidos] = useState([]);
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10)); // Set initial date to today's date
    const [noPedidos, setNoPedidos] = useState(false);

    useEffect(() => {
        if (fecha) {
            getPedidosByFecha(fecha);
        } else {
            getPedidos();
        }
    }, [fecha]);

    const handleDownload = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Pedidos');

        // Agregar encabezados con estilo
        worksheet.columns = [
            { header: 'ID Pedido', key: 'idPedido', width: 10 },
            { header: 'Cliente', key: 'cliente', width: 15 },
            { header: 'Fecha', key: 'fecha', width: 12 },
            { header: 'Hora', key: 'hora', width: 10 },
            { header: 'Estado', key: 'estado', width: 13 },
            { header: 'Total', key: 'total', width: 10 },
            { header: 'Cantidad Paquetes', key: 'cantidadPaquetes', width: 20 },
            { header: 'Paquetes', key: 'assignedPaq', width: 50 },
            { header: 'Detalles', key: 'detalles', width: 50 },
        ];

        worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '4F81BD' },
        };
        worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };

        const pedidosParaDescarga = pedidos.map((pedido) => ({
            idPedido: pedido.idPedido,
            cliente: pedido.cliente,
            fecha: pedido.fecha,
            hora: pedido.hora,
            estado: pedido.estado,
            total: pedido.total,
            cantidadPaquetes: pedido.cantidadPaquetes,
            assignedPaq: pedido.assignedPaq.map((paq) => `${paq.nombre} - $${paq.precio}`).join(', '),
            detalles: pedido.detalles.map((detalle) => `${detalle.ingrediente?.nombre || 'Ingrediente no encontrado'}`).join(', '),
        }));

        // Agregar filas con bordes
        pedidosParaDescarga.forEach((pedido) => {
            worksheet.addRow(pedido);
        });

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        // Descargar archivo
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Pedidos_${fecha}.xlsx`;
        link.click();
    };

    const getPedidos = async () => {
        try {
            const res = await axios.get(URI);
            setPedidos(res.data);
            setNoPedidos(res.data.length === 0);
        } catch (error) {
            console.error('Error fetching pedidos:', error);
        }
    };

    const getPedidosByFecha = async (fecha) => {
        try {
            const res = await axios.get(`${URI}date/${fecha}`);
            setPedidos(res.data);
            setNoPedidos(res.data.length === 0);
        } catch (error) {
            console.error('Error fetching pedidos by date:', error);
        }
    };

    const deletePedido = async (idPedido) => {
        try {
            await axios.delete(`${URI}${idPedido}`);
            if (fecha) {
                getPedidosByFecha(fecha);
            } else {
                getPedidos();
            }
        } catch (error) {
            console.error('Error deleting pedido:', error);
        }
    };

    const updatePedidoEstado = async (idPedido, estado) => {
        try {
            await axios.put(`${URI}${idPedido}`, { estado });
            if (fecha) {
                getPedidosByFecha(fecha);
            } else {
                getPedidos();
            }
        } catch (error) {
            console.error(`Error updating pedido estado to ${estado}:`, error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="row justify-content-center w-100">
                    <div className="col-12">
                        <div className="d-flex justify-content-between mb-2">
                            <Link to="/home/pedidos/create" className="btn btn-primary">
                                <i className="fas fa-plus"></i>
                            </Link>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={fecha} 
                                onChange={(e) => setFecha(e.target.value)} 
                                style={{ maxWidth: '200px' }}
                            />
                        </div>
                        <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Hora</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Cantidad de Paquetes</th>
                                        <th scope="col">Paquetes</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos.length > 0 ? (
                                        pedidos.map((pedido) => (
                                            <tr key={pedido.idPedido}>
                                                <td>{pedido.idPedido}</td>
                                                <td>{pedido.cliente}</td>
                                                <td>{pedido.fecha}</td>
                                                <td>{pedido.hora}</td>
                                                <td>{pedido.estado}</td>
                                                <td>${pedido.total}</td>
                                                <td>{pedido.cantidadPaquetes}</td>
                                                <td>
                                                    {pedido.assignedPaq?.map((paquete) => (
                                                        <div key={paquete.idPaquete}>
                                                            <strong>{paquete.nombre}</strong> - ${paquete.precio}
                                                            <ul>
                                                                {paquete.assignedPro?.map((producto) => (
                                                                    <li key={producto.idProducto}>
                                                                        {producto.nombre} - Ingredientes:
                                                                        <ul>
                                                                            {pedido.detalles
                                                                                .filter(detalle => detalle.idProducto === producto.idProducto)
                                                                                .map((detalle) => (
                                                                                    <li key={detalle.idIng}>
                                                                                        {detalle.ingrediente?.nombre || 'Ingrediente no encontrado'}
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    <Link to={`/home/pedidos/edit/${pedido.idPedido}`} className="btn btn-info mb-1">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <br/>
                                                    <button onClick={() => deletePedido(pedido.idPedido)} className="btn btn-danger mb-1">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                    <br/>
                                                    <br/>
                                                    <label>Estado:</label>
                                                    <br/>
                                                    <button onClick={() => updatePedidoEstado(pedido.idPedido, 'Completado')} className="btn btn-success mb-1">
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                    <br/>
                                                    <button onClick={() => updatePedidoEstado(pedido.idPedido, 'Cancelado')} className="btn btn-warning">
                                                        <i className="fas fa-minus-circle"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">No hay pedidos para esta fecha</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <Link onClick={handleDownload} className="btn btn-secondary mt-2"> Corte del Dia</Link>
                        <br />
                        <Link to="/home/" className="btn btn-secondary mt-2">Regresar al Menú </Link>
                        <br/>
                        <Link to="/home/pedidos/chart" className="btn btn-secondary mt-2">Ir a grafica</Link>
           
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ShowPedido;
