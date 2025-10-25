const express = require('express');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 5000;

connectDb();
app.use(express.json());

// Swagger config
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Contacts API",
            version: "1.0.0",
            description: "API documentation for the Contacts Express backend",
        },
        servers: [
            {
                url: "http://localhost:5001",
            },
        ],
    },
    apis: ["./routes/*.js", "./controllers/*.js"], // path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/test', (req, res) => {
    console.log("Test endpoint hit, request query is:", req.query);
    //res.send('Response from test endpoint, requested query is: ' + JSON.stringify(req.query));
    res.json({ message: "Response from test endpoint", query: req.query });
});

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use(require('./middleware/errorHandler').errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
