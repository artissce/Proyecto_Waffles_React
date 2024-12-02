import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExcelJS from 'exceljs';
import { Link } from 'react-router-dom';

const URI_PEDIDOS_FECHA = 'http://localhost:8000/pedidos/date/';

const CorteDelDia = () => {
    const { fecha } = useParams(); // Obtener la fecha de los parámetros de la URL
    const [pedidos, setPedidos] = useState([]);
   
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
        <div className="spreadsheet-container">
            <div>
                <button onClick={handleDownload} className="btn btn-success mt-2">
                    Descargar Excel
                </button>
            </div>
            <div className="buttons-container">
                <Link to="/home/pedidos" className="btn btn-secondary mt-2">Regresar a Pedidos</Link>
            </div>
            
        </div>
    );
};

export default CorteDelDia;
