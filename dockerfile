FROM golang:1.16.4-buster as DEV
WORKDIR /fig
COPY . .
RUN go mod tidy
