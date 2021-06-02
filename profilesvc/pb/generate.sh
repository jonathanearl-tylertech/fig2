#! /bin/zsh
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    profile.proto

    # --js_out=import_style=commonjs:../../client/src/protobuff \
    # --grpc-web_out=import_style=typescript,mode=grpcwebtext:../../client/src/protobuff \
