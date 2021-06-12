FROM node:14-alpine As development

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY src ./src
COPY tsconfig*.json ./
RUN npm run build


FROM node:14-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
# COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]