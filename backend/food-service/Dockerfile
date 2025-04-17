FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Если нужно, добавьте сборку (например, для TypeScript)
RUN npm run build

# Запуск сервера (укажите вашу команду, например, "start" или "dev")
CMD ["npm", "start"] 
# или "npm run dev" для разработки