import express from 'express'
import dotenv from 'dotenv'
import quoteRoutes from './routes/quoteRoutes.js'

dotenv.config()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// On défini le Routes API
app.use('/api/quote', quoteRoutes)

// Route de test pour l'accueil /
app.get('/', (req, res) => {
    res.json({message : "L'app se lance !"})
})



export default app;