# Stage 1
FROM node:latest as node

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/Patent-Office /usr/share/nginx/html
