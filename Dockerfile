# Imagen base oficial de Node.js 18 LTS
FROM node:18-alpine

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias (sin herramientas de desarrollo)
RUN npm install --omit=dev

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto que usará el servicio
EXPOSE 4000

# Comando de inicio
CMD ["npm", "start"]
