# Cours création d'API REST avec Node et Express

Javascript permet de faire des sites/apps côté front.
Cependant il existe un outil, qui permet d'utiliser les compétences js pour créer des projets back, cela asignifie donc que le code est bien executé côté serveur. 
-> Ici l'utilisateur n'a pas accès à vote code contrairement à js côté front.

## Prérequis

- **Runtime** : Node.js installé sur la machine (on va utiliser les modules ES)
- **Framework** : Express.js
- **Base de donnée** : MongoDB (via Mongoose)
- **Authentification** : JSON Web Tokens (jsonwebtoken), bcryptjs pour le hachage
- **Variables d'environnement** : dotenv

## Mise en place de l'environnement de travail

### Initialisation du projet

Tout d'abord on doit commencer par initialiser le projet node. 
Pour cela, sur le terminal, il faut entrer la commande `npm init`.

Cette commande va créer un fichier package.json. Le package.json contient des informations importantes sur le projet. 
Notamment: 
- Le nom du projet
- Le type de code utilisé (commonjs (CJS) ou ecma script (ES))
- Les scripts du projet (pour pouvoir le lancer, effectuer des tests, le déployer, ...)
- Les dépendances du projet

#### Les dépendances , c'est quoi ?

Pour fonctionner, le projet a besoin de certaines choses. Dans le cas d'un projet avec express il a besoin du framework express. Dans le cas du hachage de mot de passe, on aura beosin de la dépendance bcrypt, etc.

Selon le projet, on aura pas forcément avoir les même dépendances. C'est le package.json qui s'occupe de gérer cela.

En tant que développeur, il faut *installer* des dépendances grâce à la commande `npm install NomDeLaDépendance`.

### Installation des dépendances nécessaires.

```bash
npm install
npm i
```

Les deux sont similaires. On peut utiliser l'une ou l'autre, sachant que `npm i`, c'est le raccourci de `npm install`.

- `npm i express`: Permet d'installer le framework express, pour pouvoir gérer directemnt un serveur back avec node.
- `npm i mongoose`: Permet de faire la connexion à la base de donnée mongoDB et de gérer les requêtes (CRUD).
- `npm i jsonwebtoken` : Permet de gérer un token d'authentification unique
- `npm i bcryptjs` : Permet de gérer les hash de mot de passe
- `npm i dotenv`: Permet de gérer les variables d'environnement

#### Une variable d'environnement, c'est quoi ?

Une variable d'environnement est une donnée qui est potentiellement sensible.
C'est un mot de passe, un phrase secrète des accès à une base de donnée, etc. Ou tout simplement des variables qui servent à la configation pour notre application.

Sur nos web app, les variables d'environnement sont créées dans un fichier `.env`.

Exemple de contenu de variable environnement : 

```
HOST=localhost
DBNAME=masuperdb
DBUSER=username
DBPASS=monpass
```

**IMPORTANT** : Le fichier variable d'environnement DOIT ABSOLUMENT être nôté dans le fichier `.gitignore`.

On envoi JAMAIS un fichier de variables d'environnement sur github.

Par contre, ce qu'on peut faire pour le projet, c'est créer un fichier `.env.example` que l'on peut envoyer sur github.

Ce fichier doit contenir la structure attendue pour nos variables environnement.

Exemple:
```
HOST=# Nom d'hôte pour la base de données
DBNAME=# Nom de la base de données
DBUSER=# Utilisateur de la base de données
DBPASS=# Le pass de la base de données
```

### Structure des fichiers et dossiers

```text
    src/
        config/                     # Connexion à MongoDB
            - db.js                 
        controllers/                # La logique de code de notre app
            -authController.js      
        middlewares/                # Tout ce qui s'éxécute avant un controller
            - authMiddleware.js  
        models/                     # Configuration des schémas de base de données
            -authModel.js           
        routes/                     # Contient la logique des endpoints(url)
            -authRoutes.js          
    - app.js                        # Configuration de Express
- .env                              # Variables d'environnement
- package.json                     
- server.js                         # Point d'entrée de l'app
```