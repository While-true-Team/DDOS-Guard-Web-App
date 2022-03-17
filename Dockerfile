#build stage
FROM golang:alpine AS builder

RUN apk add --no-cache git

WORKDIR /go/src/app

COPY ./server .
RUN go get -d -v ./...
RUN go build -o /go/bin -v ./...

#final stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates
COPY --from=builder /go/bin/go-server /app

ENTRYPOINT /app

LABEL Name=webstarterkit Version=0.0.1
EXPOSE 8080
