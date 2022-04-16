FROM node:14.16.0-alpine
ENV NODE_ENV=prod
WORKDIR /back-end-task
COPY /package.json /back-end-task
COPY /package-lock.json /back-end-task
EXPOSE 8000
RUN npm install --production
RUN npm install dotenv -save
COPY . /back-end-task
CMD [ "node", "src/index.js" ]
