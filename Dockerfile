FROM node:12.19.0-alpine

RUN apk update && apk add python make g++

WORKDIR /usr/src/app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

CMD ["sh", "/usr/src/app/start.sh"]