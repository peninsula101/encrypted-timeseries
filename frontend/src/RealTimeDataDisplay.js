import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const RealTimeDataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const socket = io('http://localhost:4000');

    
    socket.on('dataStream', (dataStream) => {
      
      const messages = dataStream.split('|');
      setData(messages);
    });

    return () => {
      
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Data Display</h1>
      <ul>
        {data.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeDataDisplay;
