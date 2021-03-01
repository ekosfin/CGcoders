FROM node:latest

# ssh
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
    && apt-get install -y --no-install-recommends dialog \
    && apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "$SSH_PASSWD" | chpasswd 

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .
COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

RUN npm run build

RUN rm -fr ./node_modules

RUN rm -fr ./public
RUN rm -fr ./src

EXPOSE 80 80

ENTRYPOINT ["init.sh"]
