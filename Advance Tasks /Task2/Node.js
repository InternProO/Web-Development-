import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

function App() {
    const [weather, setWeather] = useState({});
    const [crypto, setCrypto] = useState({});
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherResponse = await axios.get('http://localhost:5000/api/weather?city=London');
                setWeather(weatherResponse.data);

                const cryptoResponse = await axios.get('http://localhost:5000/api/crypto');
                setCrypto(cryptoResponse.data);

                const data = {
                    labels: ['Temperature', 'Humidity'],
                    datasets: [
                        {
                            label: 'Weather Data',
                            data: [weatherResponse.data.main.temp, weatherResponse.data.main.humidity],
                            borderColor: 'blue',
                            backgroundColor: 'rgba(0,0,255,0.1)'
                        },
                        {
                            label: 'Bitcoin Price',
                            data: [cryptoResponse.data.market_data.current_price.usd],
                            borderColor: 'green',
                            backgroundColor: 'rgba(0,255,0,0.1)'
                        }
                    ]
                };
                setChartData(data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Data Visualization</h1>
            <Line data={chartData} />
            <div>
                <h2>Weather</h2>
                <p>Temperature: {weather.main?.temp}</p>
                <p>Humidity: {weather.main?.humidity}</p>
            </div>
            <div>
                <h2>Cryptocurrency</h2>
                <p>Bitcoin Price: ${crypto.market_data?.current_price.usd}</p>
            </div>
        </div>
    );
}

export default App;
