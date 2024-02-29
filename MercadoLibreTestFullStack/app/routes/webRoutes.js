// Se importa la funcion Router de express 
import {Router} from "express"

// Instancia de Router
const router = Router();

// Routes
router.get('/', (req, res) => res.render('index', {titlePage:'Mercadillo Libre'}))
router.get('/about', (req, res) => res.render('about', {titlePage: 'About Web'}))
router.get('/contact', (req, res) => res.render('contact', {titlePage: 'Contact Web'}))

// Exporta las routes 
export default router