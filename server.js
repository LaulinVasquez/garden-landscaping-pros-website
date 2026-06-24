require('dotenv').config();

const express = require('express');
const path = require('path');
const quoteRoutes = require('./src/routes/quoteRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/', quoteRoutes);

const requestedPort = Number(process.env.PORT) || 3000;
let attemptedPort = requestedPort;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${server.address().port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && port !== 0) {
      console.warn(`Port ${port} is busy. Trying an available port...`);
      server.close(() => startServer(0));
      return;
    }

    console.error(error);
    process.exit(1);
  });
}

startServer(attemptedPort);
