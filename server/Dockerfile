# Dockerfile for client

# Stage 1: Build react client
FROM node:alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY . .

CMD ["npm","start"]