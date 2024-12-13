FROM node:23

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]


