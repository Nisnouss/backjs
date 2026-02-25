import express from 'express'
import { createQuote, deleteQuote, getAllQuotes, getRandomQuote, updateQuote } from '../controllers/quoteController.js'

const router = express.Router()

// On va pouvoir gérer les routes
//          la route, middleware (si on utilise), controller
//      route, controller -> la FONCTION qui vient du controller

// Une app qui fourni des phrases inspirantes
router.get('/', getRandomQuote)

router.get('/all', getAllQuotes)

router.post('/', createQuote)

router.delete('/:id', deleteQuote)

router.put('/:id', updateQuote)

// ThunderClient

export default router