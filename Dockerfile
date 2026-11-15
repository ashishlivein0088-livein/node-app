FROM node:20-alpine

WORKDIR /app

# Install dependencies first so Docker can cache this layer
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# Change this to the port your app listens on
EXPOSE 3000

# Change "index.js" to your entry file (or use: CMD ["npm", "start"])
CMD ["node", "server.js"]
