# Base image
FROM node:14

# Set working directory in docker
WORKDIR /app

# Copy package.json and package-lock.json to download dependencies
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "serve"]
