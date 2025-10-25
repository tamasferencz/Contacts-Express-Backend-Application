const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Automatically generated Swagger doc',
    },
    host: 'localhost:5001',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // entry point file

swaggerAutogen(outputFile, endpointsFiles, doc);
