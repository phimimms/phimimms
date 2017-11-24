import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import books from './routes/books';

const app = express();
const port = process.env.PORT || 3000;

/* Connects to MongoDB */
mongoose.connect('mongodb://localhost:27017/dailyphiDB', { useMongoClient: true });

/* Response Body Compression Middleware */
app.use(compression());

/* Parses the Body of the HTTP Request */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Provides Access to dist Directory */
app.use(express.static(path.resolve(__dirname, '../client/dist')));

/* API Routers */
app.use('/api', books);

/* Homepage Route */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

/* Listens for Connections */
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening to http://localhost:${port}`);
});
