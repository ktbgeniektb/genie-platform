# 開発用React Dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]