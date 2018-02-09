FROM node:8-alpine

RUN mkdir -p /usr/src/app \
  && mkdir -p /var/www/html

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

ADD . /usr/src/app

RUN cd frontend \
  && npm install \
  && npm run build \
  && mv build /usr/src/app-frontend-static \
  && cd /usr/src/app \
  && rm -rf frontend

EXPOSE 3000

CMD [ "sh", "-c", "cp -R /usr/src/app-frontend-static/* /var/www/html && npm start" ]
