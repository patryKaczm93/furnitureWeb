import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/');
      setMessage(response.data.message);  // Zapisz dane z API do stanu
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>FastAPI + React</h1>
      <p>{message}</p>  {/* Wyświetl dane z FastAPI */}
      <button onClick={fetchData}>Fetch Message</button> {/* Pobierz dane po kliknięciu */}
    </div>
  );
}

export default App;