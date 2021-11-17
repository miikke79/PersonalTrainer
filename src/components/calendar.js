import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import listPlugin from '@fullcalendar/list';

function Calender() {
    const [trainings, setTrainings] = useState([{
        activity: '',
        name: '',
        date: '',
        duration: ''
    }]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(responce => responce.json())
            .then(datas => setTrainings(
                datas.map(data => ({
                    activity: data.activity,
                    name: data.customer.firstname + ' ' + data.customer.lastname,
                    date: data.date,
                    duration: data.duration
                }))
            ))
            .catch(err => console.error(err))
    };

    useEffect(() => fetchTrainings());

    return (
        <div className="ag-theme-material" style={{color: 'navy', height: 800, width: '90%', margin: 'auto' }}>
        <FullCalendar 
          
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
        
          left: 'today,prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        
            initialView="timeGridWeek"
            selectMirror={true}
            dayMaxEvents={true}
            
            
            events={trainings.map(training => ({
                
                start: training.date,
                end: training.duration,
                title: training.activity +' / '+ training.name,
                meridiem: 'short'
                
            }))
            }
            
        />
        
        </div>
    )
}


export default Calender;