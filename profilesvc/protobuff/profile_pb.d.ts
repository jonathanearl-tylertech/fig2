import * as jspb from 'google-protobuf'



export class ProfileIdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): ProfileIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileIdRequest): ProfileIdRequest.AsObject;
  static serializeBinaryToWriter(message: ProfileIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileIdRequest;
  static deserializeBinaryFromReader(message: ProfileIdRequest, reader: jspb.BinaryReader): ProfileIdRequest;
}

export namespace ProfileIdRequest {
  export type AsObject = {
    id: string,
  }
}

export class ProfileEmailRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): ProfileEmailRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileEmailRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileEmailRequest): ProfileEmailRequest.AsObject;
  static serializeBinaryToWriter(message: ProfileEmailRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileEmailRequest;
  static deserializeBinaryFromReader(message: ProfileEmailRequest, reader: jspb.BinaryReader): ProfileEmailRequest;
}

export namespace ProfileEmailRequest {
  export type AsObject = {
    email: string,
  }
}

export class ProfileUsernameRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): ProfileUsernameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileUsernameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileUsernameRequest): ProfileUsernameRequest.AsObject;
  static serializeBinaryToWriter(message: ProfileUsernameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileUsernameRequest;
  static deserializeBinaryFromReader(message: ProfileUsernameRequest, reader: jspb.BinaryReader): ProfileUsernameRequest;
}

export namespace ProfileUsernameRequest {
  export type AsObject = {
    username: string,
  }
}

export class ProfileResponse extends jspb.Message {
  getId(): string;
  setId(value: string): ProfileResponse;

  getName(): string;
  setName(value: string): ProfileResponse;

  getUsername(): string;
  setUsername(value: string): ProfileResponse;

  getSummary(): string;
  setSummary(value: string): ProfileResponse;

  getEmail(): string;
  setEmail(value: string): ProfileResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileResponse): ProfileResponse.AsObject;
  static serializeBinaryToWriter(message: ProfileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileResponse;
  static deserializeBinaryFromReader(message: ProfileResponse, reader: jspb.BinaryReader): ProfileResponse;
}

export namespace ProfileResponse {
  export type AsObject = {
    id: string,
    name: string,
    username: string,
    summary: string,
    email: string,
  }
}

