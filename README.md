# E-Todo — Application de Gestion de Tâches Full Stack

Application web de gestion de tâches construite avec Node.js, MySQL et React. Les utilisateurs peuvent s'inscrire, se connecter et gérer leurs tâches personnelles via une API REST sécurisée par JWT.

## Fonctionnalités

- Inscription et connexion avec mots de passe hashés (bcrypt) et tokens JWT
- CRUD complet sur les tâches (créer, lire, modifier, supprimer)
- Routes protégées — toutes les opérations sur les tâches requièrent une authentification
- Conteneurisé avec Docker pour un déploiement simplifié

## Structure du projet

```
├── e-todo.sql              # Schéma de la base de données MySQL
├── docker-compose.yml      # Docker Compose (backend + base de données + frontend)
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js           # Point d'entrée Express
│       ├── config/db.js        # Connexion MySQL
│       ├── middleware/
│       │   ├── auth.js         # Middleware JWT
│       │   └── notfound.js     # Gestionnaire 404
│       └── routes/
│           ├── auth/auth.js    # /register, /login
│           ├── todos/todos.js  # CRUD tâches
│           └── user/user.js    # Gestion utilisateurs
└── frontend/               # Interface React
```

## Routes API

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/register` | Non | Créer un compte |
| POST | `/login` | Non | Connexion et obtention du token JWT |
| GET | `/user` | Oui | Informations de l'utilisateur connecté |
| GET | `/user/todos` | Oui | Tâches de l'utilisateur connecté |
| GET | `/users/:id` | Oui | Récupérer un utilisateur par ID ou email |
| PUT | `/users/:id` | Oui | Modifier un utilisateur |
| DELETE | `/users/:id` | Oui | Supprimer un utilisateur |
| GET | `/todos` | Oui | Toutes les tâches |
| GET | `/todos/:id` | Oui | Une tâche |
| POST | `/todos` | Oui | Créer une tâche |
| PUT | `/todos/:id` | Oui | Modifier une tâche |
| DELETE | `/todos/:id` | Oui | Supprimer une tâche |

## Lancer avec Docker (recommandé)

```bash
cp .env.example .env   # remplir les identifiants
docker-compose up
```

Lance la base de données, l'API backend et le frontend en une seule commande.

## Lancer manuellement

### Base de données

```bash
cat e-todo.sql | mysql -u root -p
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Variables d'environnement (.env)

```
MYSQL_DATABASE=etodo
MYSQL_HOST=db
MYSQL_USER=your_user
MYSQL_ROOT_PASSWORD=your_password
PORT=3001
SECRET=your_jwt_secret
```

## Stack technique

- **Backend** : Node.js, Express, mysql2, jsonwebtoken, bcryptjs, dotenv
- **Frontend** : React
- **Base de données** : MySQL
- **Déploiement** : Docker, Docker Compose

## Contexte du projet

Réalisé dans le cadre d'un projet web Epitech. L'objectif était de construire une API REST complète avec authentification, de la connecter à un frontend React et de conteneuriser l'ensemble.
