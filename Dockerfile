FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]