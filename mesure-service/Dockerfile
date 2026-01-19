# ===============================
# STAGE 1 : Build
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Build (TypeScript → JavaScript)
RUN npm run build


# ===============================
# STAGE 2 : Run
# ===============================
FROM node:20-alpine

WORKDIR /app

# Copier uniquement le build + deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Variables d’environnement
ENV NODE_ENV=production
ENV PORT=8083

EXPOSE 8083

CMD ["node", "dist/main.js"]
