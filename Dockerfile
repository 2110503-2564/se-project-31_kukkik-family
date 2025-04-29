FROM node:22.14.0-alpine

RUN apk add --no-cache openjdk17

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN echo "NEXT_PUBLIC_API=http://car_rentals_service:443" > .env.local


RUN npm run build

EXPOSE 3000

CMD ['npm', 'start']