import express from 'express'
import { createQuote, getRandomQuote } from '../controllers/quoteController.js'

const router = express.Router()

// On va pouvoir gérer les routes
//          la route, middleware (si on utilise), controller
//      route, controller -> la FONCTION qui vient du controller

// Une app qui fourni des phrases inspirantes
router.get('/', getRandomQuote)

router.post('/', createQuote)

// ThunderClient

export default router