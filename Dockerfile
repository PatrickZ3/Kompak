FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Make sure .env is copied for NEXT_PUBLIC_ vars at build time
COPY .env .env

RUN npx prisma generate
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
