# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Your app binds to port 3333 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3333