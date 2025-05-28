#syntax=docker/dockerfile:1
FROM node:slim

WORKDIR /usr/src/app

ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias del sistema necesarias para Strapi y algunos plugins comunes
RUN apt-get update && apt-get install -y --no-install-recommends\
  build-essential \
  python3 \
  pkg-config \
  libpng-dev \
  libvips-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Copiar los package.json para instalar dependencias primero
COPY package.json package-lock.json ./

# Instalar dependencias (Strapi + plugins)
RUN npm install --legacy-peer-deps

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto por defecto de Strapi
EXPOSE 1337

# Comando para desarrollo
CMD ["npm", "run", "develop"]

