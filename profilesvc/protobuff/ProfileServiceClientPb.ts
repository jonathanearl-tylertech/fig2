/**
 * @fileoverview gRPC-Web generated client stub for protobuff
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as profile_pb from './profile_pb';


export class ProfileServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetById = new grpcWeb.AbstractClientBase.MethodInfo(
    profile_pb.ProfileResponse,
    (request: profile_pb.ProfileIdRequest) => {
      return request.serializeBinary();
    },
    profile_pb.ProfileResponse.deserializeBinary
  );

  getById(
    request: profile_pb.ProfileIdRequest,
    metadata: grpcWeb.Metadata | null): Promise<profile_pb.ProfileResponse>;

  getById(
    request: profile_pb.ProfileIdRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: profile_pb.ProfileResponse) => void): grpcWeb.ClientReadableStream<profile_pb.ProfileResponse>;

  getById(
    request: profile_pb.ProfileIdRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: profile_pb.ProfileResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protobuff.ProfileService/GetById',
        request,
        metadata || {},
        this.methodInfoGetById,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protobuff.ProfileService/GetById',
    request,
    metadata || {},
    this.methodInfoGetById);
  }

  methodInfoGetByUsername = new grpcWeb.AbstractClientBase.MethodInfo(
    profile_pb.ProfileResponse,
    (request: profile_pb.ProfileUsernameRequest) => {
      return request.serializeBinary();
    },
    profile_pb.ProfileResponse.deserializeBinary
  );

  getByUsername(
    request: profile_pb.ProfileUsernameRequest,
    metadata: grpcWeb.Metadata | null): Promise<profile_pb.ProfileResponse>;

  getByUsername(
    request: profile_pb.ProfileUsernameRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: profile_pb.ProfileResponse) => void): grpcWeb.ClientReadableStream<profile_pb.ProfileResponse>;

  getByUsername(
    request: profile_pb.ProfileUsernameRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: profile_pb.ProfileResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protobuff.ProfileService/GetByUsername',
        request,
        metadata || {},
        this.methodInfoGetByUsername,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protobuff.ProfileService/GetByUsername',
    request,
    metadata || {},
    this.methodInfoGetByUsername);
  }

  methodInfoGetByEmail = new grpcWeb.AbstractClientBase.MethodInfo(
    profile_pb.ProfileResponse,
    (request: profile_pb.ProfileEmailRequest) => {
      return request.serializeBinary();
    },
    profile_pb.ProfileResponse.deserializeBinary
  );

  getByEmail(
    request: profile_pb.ProfileEmailRequest,
    metadata: grpcWeb.Metadata | null): Promise<profile_pb.ProfileResponse>;

  getByEmail(
    request: profile_pb.ProfileEmailRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: profile_pb.ProfileResponse) => void): grpcWeb.ClientReadableStream<profile_pb.ProfileResponse>;

  getByEmail(
    request: profile_pb.ProfileEmailRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: profile_pb.ProfileResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/protobuff.ProfileService/GetByEmail',
        request,
        metadata || {},
        this.methodInfoGetByEmail,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/protobuff.ProfileService/GetByEmail',
    request,
    metadata || {},
    this.methodInfoGetByEmail);
  }

}

