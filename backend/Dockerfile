
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

EXPOSE 1337

CMD ["npm", "run", "start"]
