import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Text } from 'recharts';

const _ = require('lodash');

const CustomizedLabel = () => {
    return (
        <Text
            x={100}
            y={-20}
            dx={-300}
            dy={40}
            transform="rotate(-90)"
        >
            Duration(min)
        </Text>
    );
};

function Statistic() {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(responce => responce.json())
            .then(data => setTrainings(
                data.map(data => ({
                    training: data.activity,
                    duration: data.duration
                }))
            ))
            .catch(err => console.error(err))
    };

    useEffect(() => fetchTrainings());

    const result = _(trainings)
        .groupBy(x => x.training)
        .map((value, key) => ({
            training: key,
            total: _.sumBy(value, 'duration')
        }))
        .value()

    return (
        <BarChart width={900} height={400} data={result}>
            <XAxis dataKey='training' />
            <YAxis label={<CustomizedLabel />} />
            <Bar
                dataKey="total" fill='#aca9cf'
            />
        </BarChart>
    )
}

export default Statistic;