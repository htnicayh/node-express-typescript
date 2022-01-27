FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt

EXPOSE 3000

CMD ["npm", "run", "dev"]