import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PasswordService } from 'src/services/password.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { Identity, IdentityDocument } from '../schemas/identity.schema';
import { CredentialsDto } from '../dtos/credentials.dto';
import { IdentitySearchResultDto } from '../dtos/identity-search.dto';
import { IdentityMapperInterceptor } from '../interceptors/identity-mapper.interceptor';
import { IdentitySearchMapperInterceptor } from '../interceptors/identity-search-mapper.interceptor';
import { ObjectIdDto } from '../dtos/objectid.dto';
import { MongoExceptionFilter } from '../filters/mongo-exception.filter';

@ApiTags('identity')
@Controller('identity')
export class IdentityController {
  constructor(
    @InjectModel(Identity.name) private identity: Model<IdentityDocument>,
    private readonly pwSvc: PasswordService,
  ) {}

  @Get()
  @ApiQuery({ name: 'email', type: String, required: false })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: IdentitySearchResultDto })
  @UseInterceptors(IdentitySearchMapperInterceptor)
  async findAll(@Query('email') email?: string) {
    const filter: FilterQuery<{ email?: string }> = email ? { email } : {};
    const docs = await this.identity.find(filter).lean();
    return docs;
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Identity })
  @UseInterceptors(IdentityMapperInterceptor)
  async findOne(@Param() params: ObjectIdDto) {
    const { id } = params;
    const doc = await this.identity.findById(id);
    if (!doc) throw new NotFoundException();
    return doc;
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async remove(@Param() params: ObjectIdDto) {
    const { id } = params;
    const doc = await this.identity.findByIdAndRemove(id);
    if (!doc) throw new NotFoundException();
  }

  @Patch(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Identity })
  @UseInterceptors(IdentityMapperInterceptor)
  async update(@Param() params: ObjectIdDto, identity: Partial<Identity>) {
    const { id } = params;
    const doc = await this.identity.findOneAndUpdate({ id }, identity).lean();
    if (!doc) throw new NotFoundException();
    return doc;
  }

  @Post()
  @ApiConflictResponse()
  @ApiOkResponse()
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(IdentityMapperInterceptor)
  async create(@Body() identity: CredentialsDto) {
    const { email, password } = identity;
    const hash = await this.pwSvc.hash(password);
    const doc = await this.identity.create({
      id: new mongoose.Types.ObjectId(),
      _password: hash,
      email,
    });
    return doc;
  }
}
