import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Identity, IdentityDocument } from '../schemas/identity.schema';
import { CredentialsDto } from '../dtos/credentials.dto';
import { IdentitySearchResultDto } from '../dtos/identity-search-result.dto';
import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
import { IdDto } from '../dtos/id.dto';
import { PasswordService } from '../services/password.service';
import { IdentitySearchRequestDto } from '../dtos/identity-search-request.dto';

@ApiTags('identity')
@Controller('identity')
export class IdentityController {
  constructor(
    @InjectModel(Identity.name) private readonly identity: Model<IdentityDocument>,
    private readonly passwordService: PasswordService,
  ) {}

  @Get()
  @ApiQuery({ name: 'email', type: String, required: false })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: IdentitySearchResultDto })
  async findAll(@Query() query: IdentitySearchRequestDto) {
    const docs = await this.identity.find(query).populate('user').lean();
    return docs;
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Identity })
  async findOne(@Param() params: IdDto) {
    const { id } = params;
    const doc = await this.identity.findOne({ id });
    if (!doc)
      throw new NotFoundException();
    return doc;
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async remove(@Param() params: IdDto) {
    const { id } = params;
    const doc = await this.identity.findOneAndRemove({id});
    if (!doc)
      throw new NotFoundException();
  }

  @Patch(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Identity })
  async update(@Param() params: IdDto, identity: Partial<Identity>) {
    const { id } = params;
    const doc = await this.identity.findOneAndUpdate({ id }, identity).lean();
    if (!doc)
      throw new NotFoundException();

    return doc;
  }

  @Post()
  @ApiConflictResponse()
  @ApiOkResponse({ type: Identity })
  @UseFilters(MongoExceptionFilter)
  async create(@Body() body: CredentialsDto) {
    const { email } = body;
    const existing = await this.identity.findOne({email}).lean();
    if (existing)
      throw new ConflictException(`Email: '${email}' is in use.`);

    const { password } = body;
    const hash = await this.passwordService.hash(password);
    const doc = await this.identity.create({
      email,
      password: hash,
    });
    return doc;
  }
}
