// Se importa la funcion Router de express 
import {Router} from "express"

// Instancia de Router
const router = new Router();

// Routes
router.get('/', (req, res) => res.render('index', {title:'Index Web'}))
router.get('/about', (req, res) => res.render('about', {title: 'About Web'}))
router.get('/contact', (req, res) => res.render('contact', {title: 'Contact Web'}))

// Exporta las routes 
export default router