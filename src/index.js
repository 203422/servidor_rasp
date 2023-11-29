const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { SerialPort, ReadlineParser } = require('serialport');
const ioClient = require('socket.io-client');

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const socketPrincipal = ioClient(process.env.API_URL);

io.on('connection', (socket) => {
    console.log('Usuario conectado');
});

server.listen(port, () => {
    console.log('Servidor ejecutándose en el puerto ', port);
});

const getAndSubmitData = () => {

    const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })
    const parser = new ReadlineParser()

    port.pipe(parser);

    parser.on('open', function () {
        console.log('connection is opened');
    });

    parser.on('data', (data) => {
        // Enviar datos a la API
        socketPrincipal.emit('data-to-api', data);
    })
};

getAndSubmitData()
