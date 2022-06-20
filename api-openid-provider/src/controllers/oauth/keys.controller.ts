import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JWTSignatureService } from "src/services/jwt-signature.service";

@ApiTags('oauth')
@Controller('oauth2/v1/keys')
export class JwksController {

  constructor(private readonly jwt: JWTSignatureService ) {}

  @Get()
  async jwks() {
    const keys = await this.jwt.getKeys();
    return { keys };
  }
}