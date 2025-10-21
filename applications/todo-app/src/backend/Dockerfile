FROM node:22-alpine

WORKDIR /app

# Install ALL dependencies (including dev dependencies like nodemon)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Start in development mode with nodemon for hot reloading
CMD ["npm", "run", "dev"]
