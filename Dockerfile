FROM node:10.16.3-alpine as build
WORKDIR /root
RUN apk add python make gcc g++
COPY . .
RUN yarn install

FROM gcr.io/distroless/nodejs
COPY --from=build /root/ /
ENV PRODUCTION true
CMD ["app.js"]
