FROM node:alpine

RUN apk add --update python3 && \
     apk add --update unoconv && \
     apk add --update ffmpeg  && \
     apk add --update imagemagick && \
     apk add --update curl

WORKDIR /app

COPY package.json .

RUN npm install 

RUN npm install filepreview

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]