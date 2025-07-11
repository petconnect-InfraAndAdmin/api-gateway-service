# Etapa 1: Builder para instalar dependencias necesarias
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

# Etapa 2: Imagen final más limpia
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 4000

CMD ["node", "src/server.js"]
