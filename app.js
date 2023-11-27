import express from 'express';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/* Rutas */
import mainRoutes from './src/routes/mainRoutes.js';
import shopRoutes from './src/routes/shopRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config()

/* Para el funcionamiento de __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('metodo'));
app.use(methodOverride('put'));
app.use(methodOverride('delete'));

/* Motor Plantillas EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Rutas */
app.use('/', mainRoutes);  
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en  http://localhost:${PORT}`);
});