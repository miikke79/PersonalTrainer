import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs';

function Trainings() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(responce => responce.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }, [])

    const columns = [

        { field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Date', valueGetter: ({ data }) => {
                return (dayjs(data.date).format('DD/MM/YYYY h:mm a'))
            }, sortable: true, filter: true, width: 250
        },
        { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true, width: 160 },
        {
            headerName: 'Customer', valueGetter: ({ data }) =>
                `${data.customer.firstname} ${data.customer.lastname}`, sortable: true, filter: true, width: 150
        }

    ]

    return (
        <div className="ag-theme-material" style={{ height: 800, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            >

            </AgGridReact>

        </div>
    )
}

export default Trainings;