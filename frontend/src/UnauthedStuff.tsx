import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const UnauthedStuff: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const { getToken, isSignedIn } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken()
                console.log("is there a token?", token)
                console.log("are we signed in?", isSignedIn)
                const response = await axios.get('http://localhost:3001/protected');
                setData(response.data);
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Protected Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default UnauthedStuff;
