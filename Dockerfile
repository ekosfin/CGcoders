FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

RUN rm -fr ./node_modules

RUN rm -fr ./public
RUN rm -fr ./src

EXPOSE 80 80

ENTRYPOINT ["./init.sh"]
