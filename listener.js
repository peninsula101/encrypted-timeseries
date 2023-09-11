const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const mongoURL = 'mongodb://localhost:27017'; 
const dbName = 'timeseriesdb'; 
const collectionName = 'timeseriesdata'; 


function decryptAndValidateData(encryptedData) {
  const decryptionKey = 'MY_KEY';
  const decipher = crypto.createDecipheriv('aes-256-ctr', decryptionKey, Buffer.from('your-16-byte-IV'));
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  try {
    
    const parsedData = JSON.parse(decryptedData);

    
    const recreatedSecretKey = crypto.createHash('sha256').update(JSON.stringify(parsedData)).digest('hex');

    
    if (recreatedSecretKey === parsedData.secret_key) {
      return parsedData; 
    }
  } catch (error) {
    console.error('Error parsing or validating data:', error);
  }

  return null; 
}


io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('dataStream', (dataStream) => {
    const encryptedMessages = dataStream.split('|');
    const validMessages = [];

    encryptedMessages.forEach((encryptedMessage) => {
      const decryptedData = decryptAndValidateData(encryptedMessage);

      if (decryptedData) {
        validMessages.push(decryptedData);
      }
    });

    
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
      }

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      collection.insertMany(validMessages, (err, result) => {
        if (err) {
          console.error('Error inserting data into MongoDB:', err);
        } else {
          console.log(`Inserted ${result.insertedCount} valid records into MongoDB`);
        }

        client.close();
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});


server.listen(4000, () => {
  console.log('Listener service is running on port 4000');
});
