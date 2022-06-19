import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { UserCreateDto as UserCreateDto } from 'src/user/dtos/user-create.dto';
import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
import { UuidDto } from '../dtos/uuid.dto';
import { UserMapperInterceptor } from '../intercepters/user-mapper.interceptor';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { EmojiGeneratorService } from '../services/emoji-generator.service';
import { Identity, IdentityDocument } from 'src/identity/schemas/identity.schema';
import { v4 as uuidv4 } from 'uuid';
import { devNull } from 'os';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly emoji: EmojiGeneratorService,
    @InjectModel(Identity.name) private readonly identity: Model<IdentityDocument>,
    @InjectModel(User.name) private readonly user: Model<UserDocument>
  ) { }

  @Get('')
  @ApiOkResponse()
  async findAll() {
    const docs = await this.user.find({}).populate('identity').lean();
    return docs;
  }

  @Get(':uid')
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  // @UseInterceptors(UserMapperInterceptor)
  async findOne(@Param() params: UuidDto) {
    const { id } = params;
    const doc = await this.user.findOne({ id }).lean();
    if (!doc)
      throw new NotFoundException();

    return doc;
  }

  @Delete(':id')
  @ApiBadRequestResponse()
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async findByIdAndDelete(@Param() params: UuidDto) {
    const { id } = params;
    const doc = await this.user.findOneAndDelete({ id }).lean();
    if (!doc)
      throw new NotFoundException();
  }

  @Patch(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @UseFilters(MongoExceptionFilter)
  // @UseInterceptors(UserMapperInterceptor)
  async findOneAndUpdate(
    @Param() params: UuidDto,
    @Body() user: UserUpdateDto,
  ) {
    const { id } = params;
    const { icon, summary, username } = user;
    const doc = await this.user.findOne({ id });
    if (!doc)
      throw new NotFoundException();

    doc.icon = icon;
    doc.username = username;
    doc.summary = summary;
    await doc.save();
    return doc;
  }

  @Post()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  @ApiOkResponse({ type: User })
  @UseFilters(MongoExceptionFilter)
  // @UseInterceptors(UserMapperInterceptor)
  async create(@Body() body: UserCreateDto) {
    const { username } = body;

    const user = await new this.user({
      id: uuidv4(),
      icon: this.emoji.generate(),
      summary: 'Everything has beauty, but not everyone sees it.',
      username,
    });

    return user;
  }
}
