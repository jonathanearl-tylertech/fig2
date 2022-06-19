import { Body, Controller, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { CredentialsDto } from "src/dtos/credentials.dto";
import { UserSession } from "src/interfaces/UserSession";
import { User, UserDocument } from "src/schemas/user.schema";
import { PasswordService } from "src/services/password.service";
import { UserSessionService } from "src/services/user-session.service";
import { UuidService } from "src/services/uuid.service";

@ApiTags('Authn')
@Controller('api/v1/authn')
export class AuthnController {
  constructor(
    private readonly password: PasswordService,
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
    private readonly userSession: UserSessionService,
    private readonly uuid: UuidService
  ) { }

  @Post()
  async authenticate(
    @Body() body: CredentialsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { email } = body;
    const user = await this.user.findOne({ email }).lean();
    if (!user)
      throw new UnauthorizedException(`email or password is invalid`);

    const { password } = body;
    const isMatch = await this.password.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(`email or password is invalid`);
    }

    let sid = req.cookies['sid'] ?? this.uuid.generate();
    console.log({ sid })
    res.cookie('sid', sid);
    const session = this.userSession.get(sid);
    if (session && session?.redirect_uri && session?.code) {
      return res.redirect(`${session.redirect_uri}&code=${session.code}`);
    }

    console.log({ session })
    console.log({ user })
    this.userSession.set(sid, { uid: user._id } as UserSession)
    console.log(this.userSession.get(sid))
    return res.redirect('/launcher');
  }
}