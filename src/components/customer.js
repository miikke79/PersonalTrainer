import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function Customer() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    };

    const deleteCustomer = url => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            fetch(url, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) {
                        setMsg("Customer deleted");
                        setOpen(true);
                        fetchCustomers();
                    }
                    else {
                        alert('Error, deletion failed')
                    }
                })
                .catch(err => console.error(err))
        }

    };

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCustomer),
        })
            .then((response) => {
                if (response.ok) {
                    setMsg("Customer updated");
                    setOpen(true);
                    fetchCustomers();
                }
                else {
                    alert('Error, not updated failed')
                }
            })

    }

    const addCustomer = customer => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => fetchCustomers())
            .catch(err => console.error(err))

    };

    const addTraining = (newTrainings) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTrainings)
        })
            .then(response => fetchCustomers())
            .catch(err => console.error(err))

    };

    const columns = [
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 250,
            field: "links",
            cellRendererFramework: (params) => <AddTraining addTraining={addTraining} row={params} />
        },
        { field: 'firstname', sortable: true, filter: true, width: 125 },
        { field: 'lastname', sortable: true, filter: true, width: 125 },
        { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 150 },
        { field: 'city', sortable: true, filter: true, width: 150 },
        { field: 'email', sortable: true, filter: true, width: 200 },
        { headerName: 'Phone Number', field: 'phone', sortable: true, filter: true, width: 170 },
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 90,
            field: "links",
            cellRendererFramework: (params) => <EditCustomer editCustomer={editCustomer} row={params} />
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            width: 90,
            field: "links",
            cellRendererFramework: (params) => <Button
                size='small'
                color='error'
                onClick={() => deleteCustomer(params.data.links[1].href)}><DeleteForeverIcon /></Button>,
        },
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: 800, width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
            </div>

            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={handleClose}
            />

        </div>
    )
}

export default Customer;