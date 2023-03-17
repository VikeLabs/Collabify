# syntax=docker/dockerfile:1

FROM node:19-alpine3.16
WORKDIR /collabify
RUN rm -rf node_modules
ENV PATH="${PATH}:/node_modules/.bin"
COPY . .
RUN npm ci --legacy-peer-deps
EXPOSE 3000
CMD ["npm", "run", "dev"]
