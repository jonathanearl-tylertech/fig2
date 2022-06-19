import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('jwks')
@Controller('oauth2/v1/jwks')
export class JwksController {

}