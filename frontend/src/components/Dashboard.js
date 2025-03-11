import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js/auto'; // Import Chart and CategoryScale

// Register the CategoryScale
Chart.register(CategoryScale);

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');

    // Fetch data from the backend
    useEffect(() => {
        axios.get('http://localhost:8000/api/nvd-data/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Filter data based on CVE ID or Event Name
    const filteredData = data.filter(item =>
        item.cve_id.includes(filter) || item.event_name.includes(filter)
    );

    // Prepare data for the bar chart
    const chartData = {
        labels: filteredData.map(item => item.cve_id),
        datasets: [{
            label: 'Event Name Length',
            data: filteredData.map(item => item.event_name.length),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    // Chart options to explicitly define the scale type
    const chartOptions = {
        scales: {
            x: {
                type: 'category', // Explicitly set the x-axis as a category scale
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h1>Dashboard</h1>

            {/* Filter Input */}
            <input
                type="text"
                placeholder="Filter by CVE ID or Event Name"
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
            />

            {/* Bar Chart */}
            <div style={{ marginBottom: '40px' }}>
                <h2>Event Name Length</h2>
                <Bar data={chartData} options={chartOptions} /> {/* Add options */}
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>CVE ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Event Name</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.cve_id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.cve_id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.event_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;