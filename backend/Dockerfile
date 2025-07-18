
FROM node:lts-alpine AS build

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV=production
COPY --from=build /app ./
COPY ./certs/eu-west-1-bundle.pem ./certs/eu-west-1-bundle.pem

RUN chmod 644 ./certs/eu-west-1-bundle.pem

EXPOSE 1337

CMD ["npm", "run", "start"]
