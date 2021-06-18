FROM node:14-alpine As development

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG DATABASE_USE_TLS
ENV DATABASE_USE_TLS=${DATABASE_USE_TLS}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY src ./src
COPY tsconfig*.json ./
RUN npm run build

################################################
FROM node:14-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG DATABASE_USE_TLS
ENV DATABASE_USE_TLS=${DATABASE_USE_TLS}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
