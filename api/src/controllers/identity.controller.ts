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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PasswordService } from 'src/services/password.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Identity,
  IdentityDocument,
  IdentityType
} from 'src/schemas/identity.schema';
import { IdentityCreateDto } from 'src/dtos/identity-create.dto';
import { IdentitySearchResultDto } from 'src/dtos/identity-search.dto';
import { IdentityFindOneDto as IdentityFindOneDto } from 'src/dtos/identity-findOne.dto';
import { IdentityDeleteDto } from 'src/dtos/identity-delete.dto';
import { IdentityMapperInterceptor as IdentityMapperInterceptor } from 'src/interceptors/identity-mapper.interceptor';
import { IdentitySearchMapperInterceptor } from 'src/interceptors/identity-search-mapper.interceptor';


@ApiTags('identity')
@Controller('identity')
export class IdentityController {
  constructor(
    @InjectModel(Identity.name) private identity: Model<IdentityDocument>,
    private readonly pwSvc: PasswordService,
  ) { }

  @Get()
  @ApiQuery({ name: "email", type: String, required: false })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: IdentitySearchResultDto })
  @UseInterceptors(IdentitySearchMapperInterceptor)
  async findAll(@Query('email') email?: string) {
    const filter = {};
    if (email)
      filter['email'] = email;
    const docs = await this.identity.find(filter).lean();
    return docs;
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Identity })
  @UseInterceptors(IdentityMapperInterceptor)
  async findOne(@Param() params: IdentityFindOneDto) {
    const doc = await this.identity.findOne({ _id: params.id });
    if (!doc)
      throw new NotFoundException();
    return doc;
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async remove(@Param() params: IdentityDeleteDto) {
    const doc = await this.identity.findByIdAndRemove(params.id);
    if (!doc)
      throw new NotFoundException();
  }

  @Patch(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Identity })
  @UseInterceptors(IdentityMapperInterceptor)
  async update(@Param('id') id: string, update: Partial<Identity>) {
    const doc = await this.identity.findOneAndUpdate({ id }, update).lean();
    if (!doc)
      throw new NotFoundException();
    return doc;
  }

  @Post()
  @ApiOkResponse()
  @UseInterceptors(IdentityMapperInterceptor)
  async create(@Body() body: IdentityCreateDto) {
    const { email, password } = body;
    const hash = await this.pwSvc.hash(password);
    const doc = await this.identity.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hash,
      type: IdentityType.Local,
    });
    return doc;
  }
}
