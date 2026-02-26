import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import quoteRoutes from './routes/quoteRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()

// Permet de gérer l'acceptation des CORS
app.use(cors())

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// On défini le Routes API
app.use('/api/quote', quoteRoutes)
app.use('/api/auth', authRoutes)

// Route de test pour l'accueil /
app.get('/', (req, res) => {
    res.json({message : "L'app se lance !"})
})



export default app;