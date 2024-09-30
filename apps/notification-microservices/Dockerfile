FROM node:16-alpine

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install --production

WORKDIR /usr/src/app/apps/noitification-microservices

COPY ./ .

EXPOSE 3001

CMD ["npm", "run", "start:producers"]
