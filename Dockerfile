FROM node:12.19.0-alpine

RUN apk update && apk add bash

WORKDIR /usr/src/app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

CMD ["bash", "/usr/src/app/start.sh"]