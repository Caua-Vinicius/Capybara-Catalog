FROM node:lts-alpine

WORKDIR /usr/app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]