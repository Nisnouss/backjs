import Quote from "../models/quoteModels.js"

const defaultQuotes = [
    {quote: "Le succès c'est de passer d'échec en échec sans perdre son enthousiasme.", author: "A"},
    {quote: "Il n'y a qu'une seule façon d'échouer, c'est d'abandonner avant d'avoir réussi.", author: "A"},
    {quote: "L'avenir appartient à ceux qui croient à la beauté de leurs rêves.", author: "A"},
    {quote: "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", author: "A"},
    {quote: "Ne rêvez pas que ce soit plus facile. Décidez d'être meilleur.", author: "A"}
]

export const getRandomQuote = async (req, res) =>{
    try{
        // countDocuments() permet de compter le nombre d'entrée dans la BDD
        const count = await Quote.countDocuments()

        // Si la BDD est vide, on prends une phrase au hasard depuis le tableau qui est enregistré en dur.
        if(count === 0){
            const randomIndex = Math.floor(Math.random() * defaultQuotes.length)
            return res.status(200).json(defaultQuotes[randomIndex])
        }

        // Sinon récupérer aléatoirement depuis MongoDB
        const random = Math.floor(Math.random() * count)
        const quote = await Quote.findOne().skip(random)
        res.status(200).json(quote)

    }catch(error){
        console.error("Erreur de quote : " .error)
    }
}

export const createQuote = async(req, res) => {
    console.log("test")
}