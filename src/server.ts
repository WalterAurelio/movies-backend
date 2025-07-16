/* import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import cookieParser from 'cookie-parser';
import connectDatabase from './config/dbConnect';
import mongoose from 'mongoose';
import { default as authRoutes } from './routes/api/auth.routes';
import { verifyJWT } from './middlewares/verifyJWT';
import { default as moviesRoutes } from './routes/movies.routes';
import { credentials } from './middlewares/credentials';

const app = express();
const PORT = process.env.PORT || 3500;

// Conectar Base de Datos
connectDatabase();

app.use(credentials);

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth
app.use('/api/auth', authRoutes);

// Verify JWT
app.use(verifyJWT);

// Movies
app.use('/movies', moviesRoutes);

// Escuchar puerto
mongoose.connection.once('open', () => {
  console.log('Conectado exitosamente a MongoDB.');
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`);
  })
}); */
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDatabase from './config/dbConnect';
import makeApp from './app';
import { mongoDatabase } from './db/mongoDatabase';

const app = makeApp(mongoDatabase);
const PORT = process.env.PORT || 3500;

connectDatabase();

mongoose.connection.once('open', () => {
  console.log('Conectado exitosamente a MongoDB.');
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`);
  })
});