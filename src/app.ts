import express from 'express';
import authRoutes from './routes/api/auth.routes';

const app = express();
app.use(express.json());

// RUTAS
app.use('/api/auth', authRoutes);

export default app;