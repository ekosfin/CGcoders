FROM node:latest

# ssh
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
    && apt-get install -y --no-install-recommends dialog \
    && apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "$SSH_PASSWD" | chpasswd 

WORKDIR /app/temp
COPY ./Frontend/package*.json ./
RUN npm install
COPY ./Frontend .
RUN npm run build
RUN mv ./build ../build
WORKDIR /app
RUN rm -fr ./temp
COPY ./Backend/package*.json ./
RUN npm install
COPY ./Backend .
COPY sshd_config /etc/ssh/
COPY ./Backend/init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh
EXPOSE 80 80
ENTRYPOINT ["init.sh"]