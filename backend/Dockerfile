# Použijeme oficiální Node.js image (vyberte verzi LTS nebo aktuální, Alpine je menší)
FROM node:18-alpine AS development

# Nastavíme pracovní adresář uvnitř kontejneru
WORKDIR /app

# Zkopírujeme soubory se závislostmi
# Použijeme wildcard (*), abychom zahrnuli package.json i package-lock.json (nebo yarn.lock)
COPY package*.json ./

# Nainstalujeme závislosti aplikace
# V developmentu můžeme instalovat všechny (včetně devDependencies jako nodemon)
RUN npm install

# Zkopírujeme zbytek kódu aplikace do pracovního adresáře
COPY . .

# Port, na kterém aplikace naslouchá (měl by odpovídat PORT v .env)
EXPOSE 3000

# Příkaz pro spuštění aplikace v development módu s nodemon
# Nodemon sleduje změny a restartuje server
# Příznak --legacy-watch může být potřeba v některých Docker prostředích pro sledování změn
CMD ["npm", "run", "dev"]

# --- Volitelná Production Stage ---
# Pokud byste chtěli optimalizovanou image pro produkci
# FROM node:18-alpine AS production
# WORKDIR /app
# COPY package*.json ./
# # Nainstalujeme POUZE produkční závislosti
# RUN npm ci --only=production
# COPY . .
# EXPOSE 3000
# # Spustíme aplikaci přímo pomocí node
# CMD ["node", "src/server.js"]

