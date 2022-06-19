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
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CredentialsDto } from '../dtos/credentials.dto';
import { UserSearchResultDto } from '../dtos/user-search-result.dto';
import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
import { IdDto } from '../dtos/id.dto';
import { PasswordService } from '../services/password.service';
import { UserQueryDto } from '../dtos/user-query.dto';
import { UserDto } from 'src/dtos/user.dto';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
  constructor(
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
    private readonly pwd: PasswordService,
  ) {}

  @Get()
  @ApiQuery({ name: 'email', type: String, required: false })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: UserSearchResultDto })
  async findAll(@Query() query: UserQueryDto) {
    const docs = await this.user.find(query).lean();
    return docs;
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: UserDto })
  async findOne(@Param() params: IdDto) {
    const { id } = params;
    const doc = await this.user.findOne({ id });
    if (!doc) throw new NotFoundException();
    return doc;
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async remove(@Param() params: IdDto) {
    const { id } = params;
    const doc = await this.user.findOneAndRemove({ id });
    if (!doc) throw new NotFoundException();
  }

  @Patch(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: UserDto })
  async update(@Param() params: IdDto, @Body() identity: Partial<User>) {
    const { id } = params;
    console.log(identity);
    const doc = await this.user.findOneAndUpdate({ id }, identity).lean();
    if (!doc) throw new NotFoundException();

    return doc;
  }

  @Post()
  @ApiConflictResponse()
  @ApiOkResponse({ type: UserDto })
  @UseFilters(MongoExceptionFilter)
  async create(@Body() body: CredentialsDto) {
    const { email } = body;
    const existing = await this.user.findOne({ email }).lean();
    if (existing) throw new ConflictException(`Email: '${email}' is in use.`);

    const { password } = body;
    const hash = await this.pwd.hash(password);
    const doc = await this.user.create({
      email,
      password: hash,
    });
    return doc;
  }
}
