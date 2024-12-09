FROM golang:1.22.9-bullseye AS build

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN apt-get update
RUN apt-get install
RUN go build -v -o /usr/local/bin/app

EXPOSE 5000
CMD ["app"]
