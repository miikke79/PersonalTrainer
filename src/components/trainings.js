import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchTrainings()
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(responce => responce.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    };

    const deleteTrainings = trainingsId => {
        if (window.confirm('Are you 100% sure you want to delete this?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + trainingsId, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) {
                        setMsg("Training deleted");
                        setOpen(true);
                        fetchTrainings();
                    }
                    else {
                        alert('Error, deletion failed')
                    }
                })
                .catch(err => console.error(err))
        }

    };

    const columns = [

        { field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Date', valueGetter: ({ data }) => {
                return (dayjs(data.date).format('DD/MM/YYYY h:mm a'))
            }, sortable: true, filter: true, width: 250
        },
        { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true, width: 260 },
        {
            headerName: 'Customer', valueGetter: ({ data }) =>
                `${data.customer.firstname} ${data.customer.lastname}`, sortable: true, filter: true, width: 150
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 70,
            field: "",
            cellRendererFramework: (params) => <Button
                size='small'
                color='error'
                onClick={() => deleteTrainings(params.data.id)}><DeleteForeverIcon /></Button>,
        },

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