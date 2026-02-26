import jwt from 'jsonwebtoken'
import User from '../models/authModel.js'

// Fonction pour générer un token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

// Fonction pour enregistrer un utilisateur
export const registerUser = async (req, res, next) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            res.status(400)
            throw new Error("Veuillez fournir tous les champs");
        }

        // Véridier si l'utilisateur existe déjà
        const userExists = await User.findOne({email})

        if(userExists){
            res.status(400)
            throw new Error("Cet utilisateur existe déjà");
        }

        // Créer l'utilisateur (le mpd sera hasher via le middleware mongoose)
        const user = await User.create({
            email,
            password
        })

        if(user){
            return res.status(201).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        res.status(400)
        throw new Error("Données utilisateur invalides");
    } catch (error) {
        console.error('Enregistrement impossible: ', error)
        return res.status(500)
    }
}

// Fonction pour se connecter en tant qu'utilisateur