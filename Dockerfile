# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usa la app (definido en config)
EXPOSE 4000

# Comando para iniciar la app
CMD ["node", "src/server.js"]
