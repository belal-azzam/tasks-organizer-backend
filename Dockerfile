FROM node:14

RUN apt-get update && \
    apt-get install nano

WORKDIR /usr/src/app

RUN npm install
RUN npm i -g typeorm
RUN npm i -g ts-node

EXPOSE 3000

CMD ["npm", "run", "start:dev"]