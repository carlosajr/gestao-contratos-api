FROM node:lts-alpine

WORKDIR /app

COPY ./src /app/src
COPY .env /app/.env
COPY package.json /app/package.json
COPY ormconfig.json /app/ormconfig.json
COPY tsconfig.json /app/tsconfig.json

RUN yarn

EXPOSE 3333

# forca um wait para investigar o docker
# ENTRYPOINT ["/bin/sh", "-c", "while true; do sleep 1; done"]
ENTRYPOINT [ "yarn", "start" ]