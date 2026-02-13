FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/models ./models
COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./server.js

COPY package*.json ./

RUN npm install --production

EXPOSE 3000

CMD ["node", "server.js"]
