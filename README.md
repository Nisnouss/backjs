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

## Rôle de chaque dossier

### Les routes : Le standard téléphonique / L'aiguilleur

- **C'est quoi?** C'est le point d'entrée de notre API. Les routes définissent les URL ou endpoints accessibles par les utilisateurs (ex: `GET/api/quotes`ou `POST/api/auth/login`).
- **Leur rôle :** Lorsqu'une personne (ou le frontend) fait une requête vers votre API, la route reçoit cet appel, comprend ce que l'utilisateur veut faire, et dirige l'appel vers le bon **Controller**. Une route ne contient aucune logique complexe, elle se contente de transférer la demande à la bonne personne.

### Les models 

- **C'est quoi?** Le model est la représentation structurelles de nos données en code. Il fait le lien (grâce à Mongoose) avec la base de données MongoDB.
- **Son rôle :**: Il définit le schéma de nos données. C'est lui qui définit si l'utilisateur doit avoir un email, par exemple (de type chaîne de caractère, défini comme obligatoire et unique). C'est le modèle qui se charge de faire toutes les actions d'écriture directes dans la base de données (CRUD).

### Les controllers : Le cerveau / le manager

- **C'est quoi?** C'est ici que se trouve la logique métier de notre application
- **Son rôle :** Le controller reçoit la demande transmise par la route. C'est lui qui fait le travail. Il lit les informations envoyées par l'utilisateur (le body). Il demande au **model** d'intéragir avec la base de données , puis **prépare et renvoie la réponse** finale à l'utilisateur au fromat JSON en gérant différnats cas de succès ou d'erreurs.

### Les middlewares : La douane / le vigile

- **C'est quoi?** C'est une fonction qui s'execute au milieu (middle) de la reqûte. Elle a lieu juste après que la route a été appélée mais juste avant que la requête n'arrive dans le controller.
- **Son rôle :** Il effectue de vérifications à la volées. L'exemple le plus courant en API  est **middleware d'authetification** : il cérifie qu'un utilisteur possède un token valide (la "carte d'identité") avant de le laisser accéder à de informations privées. S'il n'a pas son ticket, la douane bloque tout et renvoie une erreur (401 - Accès refusé). Si tout vas bien, il appelle une fonction `next()` qui laisse passe la requête ver le controlleur

## Résumé des commande pour un bouveau projet et configuration

```bash
npm init
npm i express
npm i mongoose
npm i jsonwebtoken
npm i bcryptjs
npm i dotenv
```

Vous pouvez installer tout en une seule fois, après `npm init`: `npm i express mongoose jsonwebtoken bcryptjs dotenv`.

### Configuration

Ouvrir le fichier package.json, et faire en sorte d'avoir la ligne `"type": "module"`.

### Petite astuce

Lorsque vous voulez démarrer votre serveur avec la commande `node server`ou `npm run dev`, si vous avez configuré le script. Votre serveur sera lancé et figé à l'état du lancement.

Ce qui signifie, que si vous effectuez une modificaion sur votre code, vous allez de voir couper le serveur et le relancer. Ce qui est pénible.

Pour éviter cette manipulation, vous pourvez installer de manière globale l'outil nodemon. Pour cela, vous le faites UNE SEULE FOIS sur la machine: `npm i -g nodemon`.

Cette fois-ci, au lieu de lancer notre serveu avec `node server`, vous allez le lancer avec `nodemon server`. Ce qui aura pour effet, qu'à chaque modification de notre code, que le serveur se recharge automatiquement.