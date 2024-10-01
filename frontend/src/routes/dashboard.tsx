import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const { getToken } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken()
                const response = await axios.get('http://localhost:3001/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <h1>Dashboard page</h1>
            <p>This is a protected page.</p>
            <p>Protected Data:  <pre>{JSON.stringify(data, null, 2)}</pre></p>

            <ul>
                <li>
                    <Link to="/dashboard/invoices">Invoices</Link>
                </li>
                <li>
                    <Link to="/">Return to index</Link>
                </li>
            </ul>
        </>
    )
}