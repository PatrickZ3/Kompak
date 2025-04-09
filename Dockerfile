FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY prisma ./prisma

RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .
 
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
