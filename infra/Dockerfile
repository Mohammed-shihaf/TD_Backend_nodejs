# syntax=docker/dockerfile:1
FROM node:24-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production || npm install --only=production
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
