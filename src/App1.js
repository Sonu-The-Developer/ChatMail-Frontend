import React, { useEffect, useState } from 'react';
import { socket } from './socket';
import { Input } from 'antd';

const { Search } = Input;

function App() {
  const [message, setMessage] = useState('B');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState(['A']);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('toClient', (data) => {
      setResponses((prev) => [...prev, data]);
    });    
    
    // Clean up the listener on component unmount
    return () => {
      socket.off('toClient');
    };
  }, []);
  
  const sendMessage = async () => {
    setLoading(true);
    socket.emit('toServer', message);
    // setMessage('');
    const response = await fetch('http://localhost:5000/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    setTimeout(() => setLoading(true), 2000);
  };

  return (
    <div>
      <h1>Socket.io React App</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e?.target?.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <br />
      <br />
      <Search 
        placeholder="input search loading with enterButton" 
        enterButton 
        loading={false} 
        style={{ width: 200 }}
        onChange={(e) => setMessage(e?.target?.value)}
        onSearch={sendMessage}
      />
      <h2>Responses:</h2>
      <ul>
        {responses.map((response, index) => (
          <li key={index}>{response}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
