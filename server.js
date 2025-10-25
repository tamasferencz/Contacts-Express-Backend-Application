const express = require('express');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDb();
app.use(express.json());

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
