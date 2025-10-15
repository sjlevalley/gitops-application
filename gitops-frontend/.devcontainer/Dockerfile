# Use the official Node.js image as base
FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

# Install additional tools
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g \
    @next/codemod \
    typescript \
    ts-node

# Set the working directory
WORKDIR /workspaces/gitops-frontend

# Switch to node user
USER node
