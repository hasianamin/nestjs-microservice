FROM node:16-alpine

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install --production

WORKDIR /usr/src/app/apps/consumers

COPY ./ .

EXPOSE 3002

CMD ["npm", "run", "start:consumers"]
