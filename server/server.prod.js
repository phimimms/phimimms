import bodyParser from 'body-parser';
import books from './routes/books';
import compression from 'compression';
import express from 'express';
import mongoose from 'mongoose';
import open from 'open';
import path from 'path';

const app = express();
const port = 3000;

/* Connects to MongoDB */
mongoose.connect('mongodb://localhost:27017/dailyphiDB');

/* Response Body Compression Middleware */
app.use(compression());

/* Parses the Body of the HTTP Request */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Provides Access to dist Directory */
app.use(express.static('dist'));

/* API Routers */
app.use('/api', books);

/* Homepage Route */
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

/* Listens for Connections */
app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    open(`http://localhost:${port}`);
});
