import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customer() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(responce => responce.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }, [])

    const columns = [
        { field: 'firstname', sortable: true, filter: true, width: 125 },
        { field: 'lastname', sortable: true, filter: true, width: 125 },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 150 },
        { field: 'city', sortable: true, filter: true, width: 150 },
        { field: 'email', sortable: true, filter: true, width: 200 },
        { field: 'phone', sortable: true, filter: true, width: 200 },
    ]

    return (
        <div className="ag-theme-material" style={{ height: 800, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            >
            </AgGridReact>
        </div>
    )
}

export default Customer;