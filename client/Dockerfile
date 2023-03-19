FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_API=${VITE_API}

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
