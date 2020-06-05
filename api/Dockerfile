FROM node:latest

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY ./api/package.json /usr/src/app/
RUN npm install

COPY ./api /usr/src/app
RUN ls /usr/src/app

EXPOSE 8545
EXPOSE 3000

CMD [ "npm", "start" ]
