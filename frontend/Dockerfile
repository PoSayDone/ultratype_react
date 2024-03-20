FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package.json .
RUN yarn --frozen-lockfile
COPY . .
