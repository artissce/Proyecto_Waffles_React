import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import '@syncfusion/ej2-react-spreadsheet/styles/material.css';
import './Spreadsheet.css';

const URI_PEDIDOS_FECHA = 'http://localhost:8000/pedidos/date/';

const CorteDelDia = () => {
    const { fecha } = useParams(); // Obtener la fecha de los parámetros de la URL
    const [pedidos, setPedidos] = useState([]);
    const spreadsheetRef = useRef(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const res = await axios.get(`${URI_PEDIDOS_FECHA}${fecha}`);
                setPedidos(res.data);
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }
        };

        fetchPedidos();
    }, [fecha]);

    useEffect(() => {
        if (spreadsheetRef.current && pedidos.length > 0) {
            const sheet = spreadsheetRef.current.sheets[0];
            sheet.ranges = [{
                dataSource: pedidos,
                startCell: 'A1',
                showHeader: true,
                columns: [
                    { field: 'idPedido', headerText: 'ID Pedido', width: 80 },
                    { field: 'cliente', headerText: 'Cliente', width: 100 },
                    { field: 'fecha', headerText: 'Fecha', width: 100 },
                    { field: 'hora', headerText: 'Hora', width: 100 },
                    { field: 'estado', headerText: 'Estado', width: 100 },
                    { field: 'total', headerText: 'Total', width: 100 },
                    { field: 'cantidadPaquetes', headerText: 'Cantidad Paquetes', width: 150 }
                ]
            }];
            spreadsheetRef.current.refresh();
        }
    }, [pedidos]);

    return (
        <div className="spreadsheet-container">
            <SpreadsheetComponent ref={spreadsheetRef}>
                <SheetsDirective>
                    <SheetDirective name="Pedidos">
                        <RangesDirective>
                            <RangeDirective dataSource={pedidos} startCell="A1" showHeader={true} />
                        </RangesDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
        </div>
    );
};

export default CorteDelDia;
