FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

COPY init.sh /usr/local/bin/
	
RUN chmod u+x /usr/local/bin/init.sh

RUN rm -fr ./node_modules

RUN rm -fr ./public
RUN rm -fr ./src

EXPOSE 80 80

ENTRYPOINT ["init.sh"]