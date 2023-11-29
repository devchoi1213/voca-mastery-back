FROM node:18.15.0-slim

# Installing curl to facilitate health checks if necessary.
RUN apt-get update && apt-get install curl -y

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm install --global cross-env
RUN npm install

# Copy app source to the container
COPY . .

EXPOSE 3000

CMD [ "npm", "start"]