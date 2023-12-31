import express from 'express';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/* Importación de Rutas */
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

/* Carga de archivos estáticos */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/Assets/Img/img-form', express.static(path.join(__dirname, 'public', 'Assets', 'Img', 'img-form')));


/* Motor Plantillas EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'));

app.post('/', uploadMiddleware.single('image'), (req, res) => {
  res.send('¡Producto actualizado!')
})

/* Rutas */
app.use('/', mainRoutes);  
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

/* Redirección de formularios */
import { uploadMiddleware, loginMiddleware, validatorMiddleware } from './src/middleware/index.js'

import { mainRouter, formRouter } from './src/routes/index.js';
app.use(express.urlencoded({extended: true}))

app.use('/', mainRouter);
app.use('/', formRouter);

/* Redirección al Home al iniciar el server*/
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Formulario Contacto
app.post('/form', loginMiddleware, validatorMiddleware,(req,res) => {
  console.log(req.body)
  res.send('Tu consulta ha sido recibida! a la brevedad nos estaremos comunicando con vos!')
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en  http://localhost:${PORT}`);
});