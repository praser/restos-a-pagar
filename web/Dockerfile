FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn --silent
RUN yarn add react-scripts@3.4.1 -g --global

COPY . ./

CMD ["yarn", "start"]