FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

EXPOSE 80

RUN npm run build

RUN rm -fr ./node_modules

RUN rm -fr ./public
RUN rm -fr ./src

CMD [ "serve", "-l", "80", "build" ]