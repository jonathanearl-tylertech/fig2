import { Controller, Get } from "@nestjs/common";

@Controller('login')
export class LoginController {
  @Get()
  login() {
    return (`
      <html>
        <body>
          <form style="display: flex; flex-direction: column"
              method="POST"
              action="/api/v1/authn">
            <input type="text" name="email"/>
            <input type="password" name="password"/> 
            <button type="submit">submit</button>
          </form>
        </body>
      </html>
    `)
  }
}