# Dockerfile

FROM node
RUN npm install -g nodemon
COPY . /code
