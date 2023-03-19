FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install @prisma/client@^4.11.0
RUN npm install prisma@^4.11.0

COPY . .

ENV JWT_SECRET=${JWT_SECRET}
ENV MONGO_URL=${MONGO_URL}

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
