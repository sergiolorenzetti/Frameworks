FROM node:20

WORKDIR /app

COPY src/package*.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]  