import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import ExcelJS from 'exceljs';

const URI_PEDIDOS_FECHA = 'http://localhost:8000/pedidos/date/';

const ConsulCorte = () => {
    const [fecha, setFecha] = useState('');
    const [pedidos, setPedidos] = useState([]);

    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    useEffect(() => {
        fetch(`${URI_PEDIDOS_FECHA}${fecha}`)
        .then((res) => res.json())
        .then((data) => {
            const pedidosProcesados = data.map((pedido) => ({
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
            setPedidos(pedidosProcesados);
        })
        .catch((error) => console.error('Error fetching pedidos:', error));
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

        // Agregar filas con bordes
        pedidos.forEach((pedido) => {
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

    return (
        <Container>
            <div className='admin-menu-container'>
                <h1>Consultar Cortes</h1>
                <form>
                    <label>
                        Selecciona la Fecha:
                        <br/>
                        <input
                            type="date"
                            value={fecha}
                            onChange={handleFechaChange}
                            required
                        />
                    </label>
                    <br/>
                    <br/>
                    <div>
                        <Link to="/admin/consulta">
                            <button onClick={handleDownload} className="btn btn-outline-primary btn-block">
                                Ver Total de ventas
                            </button>
                        </Link>
                    </div>
                    <div className="buttons-container">
                        <Link to="/admin" className="btn btn-secondary mt-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default ConsulCorte;
