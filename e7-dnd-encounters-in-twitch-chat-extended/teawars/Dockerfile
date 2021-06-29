FROM node:alpine

# the server
COPY ./deployment/server /app
COPY ./assets /app/public/assets
COPY ./index.html /app/public/

# copy files for building the phaser game
COPY ./package.json /teawars/
COPY ./package-lock.json /teawars/
COPY ./tsconfig.json /teawars/
COPY ./webpack.config.js /teawars/
COPY ./src /teawars/src

# build the phaser game and expose publicly
WORKDIR /teawars
RUN npm install
RUN npm run build
RUN mv build ../app/public/build
RUN rm -r /teawars

# install and run the server
WORKDIR /app
RUN npm install
CMD ["npm", "run", "start"]
