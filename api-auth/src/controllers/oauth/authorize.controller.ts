import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthorizeQueryDto } from "src/dtos/authorize-query.dto";

@ApiTags('authorize')
@Controller('oauth2/v1/authorize')
export class AuthorizeController {
    @Get()
    authorize(@Query() query: AuthorizeQueryDto) {
        const { response_type, scope, client_id, state, redirect_uri, nonce } = query;

        return query;
    } 
}