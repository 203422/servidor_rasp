const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
// const { SerialPort, ReadlineParser } = require('serialport');
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

const socketPrincipal = ioClient('http://192.168.1.129:3000');

io.on('connection', (socket) => {
    console.log('Usuario conectado');
});

server.listen(port, () => {
    console.log('Servidor ejecutándose en el puerto ', port);
});

const getAndSubmitData = () => {

    // const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })
    // const parser = new ReadlineParser()

    // port.pipe(parser);

    // parser.on('open', function () {
    //     console.log('connection is opened');
    // });

    // parser.on('data', (data) => {
        // Enviar datos a la API
        // console.log(data);
        socketPrincipal.emit('data-to-api', 'hola');
    // })

    // Emitir a clientes conectados si es necesario
    // io.emit('data-clients', data);
};

getAndSubmitData()
// simulateSensorData();

// socketPrincipal.on('enviar-datos', (data) => {
//     console.log('Recibido desde el servidor principal local:', data);
// });

// function getRandomArbitrary(min, max) {
//     return Math.random() * (max - min) + min;
// }

// function getRandomChoice(choices) {
//     const randomIndex = Math.floor(Math.random() * choices.length);
//     return choices[randomIndex];
// }

// function simulateSensorData() {
//     const nivelAgua = getRandomArbitrary(0, 200);
//     const temperaturaAgua = getRandomArbitrary(20, 30);
//     const lluvia = 9600;
//     const ph = getRandomArbitrary(6.0, 8.0);
//     const actuadorCloro = getRandomChoice(["Activo", "Inactivo"]);

//     getAndSubmitData({ nivelAgua, temperaturaAgua, lluvia, ph });
// }

// setInterval(simulateSensorData, 5000);

