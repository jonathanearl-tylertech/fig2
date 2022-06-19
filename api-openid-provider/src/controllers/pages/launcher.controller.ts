import { Controller, Get, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { UserSessionService } from "src/services/user-session.service";

@Controller('launcher')
export class LauncherController {
  constructor(
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
    private readonly userSession: UserSessionService,
  ) {}

  @Get()
  async launcher(@Res() res: Response, @Req() req: Request) {
    const sid = req.cookies['sid'];
    const session = this.userSession.get(sid);
    console.log(session);
    if (!session?.uid)
      return res.redirect('/login');

    const user = await this.user.findOne({ id: session.uid }).lean();
    
    return res.send(`
      <html>
        <body>
          <h1>I am launcer ${user.email} </h1>
        </body>
      </html>
    `)
  }
}