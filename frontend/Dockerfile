FROM node:21-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
RUN yarn add serve -g
COPY . .
RUN yarn run build

EXPOSE 5000
ENV NODE_ENV=production
CMD ["yarn", "serve", "-s", "dist", "-l", "5000"]
