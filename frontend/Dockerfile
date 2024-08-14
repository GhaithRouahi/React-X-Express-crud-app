# Stage 1: Build the React app
FROM node:18 AS build
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]