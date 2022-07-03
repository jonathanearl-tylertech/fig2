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
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto as UserCreateDto } from 'src/dtos/user-create.dto';
import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
import { IdDto } from '../dtos/id.dto';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { EmojiGeneratorService } from '../services/emoji-generator.service';
import { v4 as uuidv4 } from 'uuid';
import { SearchDto as SearchDto } from '../dtos/search.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly emoji: EmojiGeneratorService,
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
  ) {}

  @Get('')
  @ApiOkResponse()
  async search(@Param() params: SearchDto) {
    const docs = await this.user.find(params).lean();
    return docs;
  }

  @Get(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  async findOne(@Param() params: IdDto) {
    const { id } = params;
    const doc = await this.user.findOne({ id }).lean();
    return doc;
  }

  @Delete(':id')
  @ApiBadRequestResponse()
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async findByIdAndDelete(@Param() params: IdDto) {
    const { id } = params;
    const doc = await this.user.findOneAndDelete({ id }).lean();
    if (!doc) throw new NotFoundException();
  }

  @Patch(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @UseFilters(MongoExceptionFilter)
  async findOneAndUpdate(@Param() params: IdDto, @Body() user: UserUpdateDto) {
    const { id } = params;
    const { icon, summary, username } = user;
    const doc = await this.user.findOne({ id });
    if (!doc) throw new NotFoundException();

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
    const { email, sub, username } = body;

    const user = await this.user.create({
      id: uuidv4(),
      icon: this.emoji.generate(),
      email,
      sub,
      summary: 'Everything has beauty, but not everyone sees it.',
      username,
    });

    return user;
  }
}
