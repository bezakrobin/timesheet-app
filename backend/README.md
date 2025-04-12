# Struktura BE

```
backend/
├── database/                 # Databázové migrace a schéma
│   ├── migrations/
│   │   └── V1__initial_schema.sql # SQL soubor zůstává stejný
│   ├── database.json         # Příklad konfiguračního souboru pro migraci (např. db-migrate, sequelize-cli)
│   └── README.md             # Info k databázi a migracím
│
├── src/                      # Hlavní zdrojový kód aplikace
│   ├── app.js                # Hlavní soubor aplikace (nastavení Expressu, middleware)
│   ├── server.js             # Spouštěcí soubor (vytváří a startuje HTTP server)
│   │
│   ├── config/               # Konfigurace (načítání .env, nastavení DB, atd.)
│   │   └── index.js          # Hlavní export konfigurace (nebo např. config.js)
│   │
│   ├── db/                   # Nastavení DB připojení (např. pomocí Sequelize, Prisma, Knex)
│   │   └── index.js          # Inicializace DB spojení / ORM
│   │
│   ├── models/               # ORM modely (Sequelize modely, Prisma schéma, atd.)
│   │   ├── index.js          # Pro snadnější import a asociace modelů (běžné u Sequelize)
│   │   ├── user.model.js     # Přejmenování pro jasnost
│   │   ├── client.model.js
│   │   ├── project.model.js
│   │   ├── task.model.js
│   │   ├── tag.model.js
│   │   ├── timeEntry.model.js  # CamelCase je běžný v JS/Node
│   │   ├── projectMembership.model.js
│   │   └── taskTag.model.js
│   │
│   ├── routes/               # Definice API cest (Express Routers)
│   │   ├── index.js          # Agreguje všechny routery a připojuje je k aplikaci
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── profile.routes.js
│   │   ├── clients.routes.js
│   │   ├── projects.routes.js
│   │   ├── tasks.routes.js
│   │   ├── tags.routes.js
│   │   └── timeEntries.routes.js
│   │
│   ├── controllers/          # Logika pro zpracování requestů a odeslání response
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── client.controller.js
│   │   └── ...               # Kontrolery pro další zdroje
│   │
│   ├── services/             # Business logika (volitelné, pro oddělení od kontrolerů)
│   │   ├── user.service.js
│   │   └── ...
│   │
│   ├── middleware/           # Express middleware (autentizace, validace, logování, error handling)
│   │   ├── auth.middleware.js  # Ověření JWT tokenu
│   │   ├── validate.middleware.js # Middleware pro validaci requestů (např. s Joi)
│   │   └── errorHandler.middleware.js # Centrální zpracování chyb
│   │
│   └── validators/           # Schémata pro validaci requestů (např. pomocí Joi, express-validator)
│       ├── auth.validator.js
│       ├── user.validator.js
│       └── ...
│
├── tests/                    # Testy aplikace (jednotkové, integrační, e2e)
│   └── ...
│
├── .env                      # Lokální proměnné prostředí (NESMÍ BÝT V GITU!)
├── .env.example              # Příklad .env souboru
├── .gitignore                # Soubory ignorované Gitem (přidat node_modules, .env, atd.)
├── package.json              # Seznam Node.js závislostí a NPM skriptů
├── package-lock.json         # Uzamčení verzí závislostí
└── README.md                 # Hlavní README projektu backendu
```