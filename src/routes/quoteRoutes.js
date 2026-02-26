import express from 'express'
import { createQuote, deleteQuote, getAiQuote, getAllQuotes, getRandomQuote, updateQuote } from '../controllers/quoteController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

// On va pouvoir gérer les routes
//          la route, middleware (si on utilise), controller
//      route, controller -> la FONCTION qui vient du controller

// Une app qui fourni des phrases inspirantes
router.get('/', getRandomQuote)

router.get('/all', getAllQuotes)

router.get('/aiquote', getAiQuote)

//          route middleware, encoreMiddleware, etc, séparé par la virgule
//                                                             à la fin c'est le CONTROLLER
router.post('/', protect, createQuote)

router.delete('/:id', protect, deleteQuote)

router.put('/:id', protect, updateQuote)

// ThunderClient

export default router