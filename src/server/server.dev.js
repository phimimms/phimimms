import books from './routes/books';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const app = express();
const compiler = webpack(config);
const port = 3000;

/* Connects to MongoDB */
mongoose.connect('mongodb://localhost:27017/dailyphiDB');

/* Parses the Body of the HTTP Request */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* API Routers */
app.use('/api', books);

/* Webpack Development Middleware */
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

/* Hot Reloading Middleware */
app.use(require('webpack-hot-middleware')(compiler));

/* Homepage Route */
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

/* Listens for Connections */
app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    open(`http://localhost:${port}`);
});
