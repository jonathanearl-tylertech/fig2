import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ObjectIdDto } from 'src/identity/dtos/objectid.dto';
import { UserCreateDto } from 'src/user/dtos/user-create.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  @Get('')
  @ApiOkResponse()
  async findAll() {
    const docs = await this.user.find({}).lean();
    return docs;
  }

  @Get(':uid')
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  async findOne(@Param() params: ObjectIdDto) {
    const { id } = params;
    const doc = await this.user.findById(id).lean();
    if (!doc) throw new NotFoundException();
    return doc;
  }

  @Delete(':id')
  @ApiBadRequestResponse()
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async findByIdAndDelete(@Param() params: ObjectIdDto) {
    const { id } = params;
    const doc = await this.user.findByIdAndDelete(id).lean();
    if (!doc) throw new NotFoundException();
  }

  @Patch(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  async findOneAndUpdate(
    @Param() params: ObjectIdDto,
    @Body() user: Partial<User>,
  ) {
    const { id } = params;
    const doc = await this.user.findOneAndUpdate({ _id: id }, user).lean();
    if (!doc) throw new NotFoundException();
    return doc;
  }

  @Post()
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: User })
  async create(@Body() body: UserCreateDto) {
    const { username } = body;
    const doc = await this.user.create({
      _id: new mongoose.mongo.ObjectId(),
      username,
    });
    return doc;
  }
}
