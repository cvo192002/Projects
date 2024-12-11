# Use the official Node.js image as base
FROM node:lts-alpine
# if you set the working directory to /usr/app, 
# all following commands in the Dockerfile will be executed in that directory inside the container. 
WORKDIR /usr/app
# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application files to the container
COPY . .
# Expose port 3000
EXPOSE 3000
# Command to run the application
CMD ["node", "app.js"]