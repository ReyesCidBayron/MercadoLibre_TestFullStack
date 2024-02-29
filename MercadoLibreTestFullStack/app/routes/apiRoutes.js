
import express from 'express';
import apiController from '../controllers/apiController.js';

const router = express.Router();

// Rutas de la API
router.get('/items', apiController.searchItems);
router.get('/items/:id', apiController.getItemDetails);

export default router;