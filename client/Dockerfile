# Dockerfile for client

# Stage 1: Build react client
FROM node:alpine

WORKDIR /app

COPY package*.json ./


# Install dependencies
RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
# copy local files to app folder
COPY . .

CMD ["npm","start"]