FROM node:latest

WORKDIR /usr/src/client

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN npm install -g gatsby-cli

COPY ./client/package.json /usr/src/client/
RUN npm install

COPY ./client /usr/src/client

EXPOSE 8000

CMD ["gatsby", "develop", "-H", "0.0.0.0"]
