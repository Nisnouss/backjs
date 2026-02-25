import express from 'express'

const app = express()

// Route de test pour l'accueil /
app.get('/', (req, res) => {
    res.json({message : "L'app se lance !"})
})

export default app;