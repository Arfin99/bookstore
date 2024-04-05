FROM node:20-alpine

#Create a app Directory
WORKDIR /bookstore

#Install app dependencies
COPY package*.json ./

#Run npm install
RUN npm install

#Bundle app source
COPY . .
EXPOSE 8080

CMD [ "npm", "start" ]