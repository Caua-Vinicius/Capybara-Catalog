FROM node:lts-alpine

WORKDIR /usr/app/backend

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="mysql://root:root_password@mysql:3307/capydb"

EXPOSE 3000

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]