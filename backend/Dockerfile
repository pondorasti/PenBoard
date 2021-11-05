FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm ci

COPY . .

RUN npm run build

COPY dist ./dist

EXPOSE 8001

CMD npm start