import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GROUPS_KEY } from 'src/decorators/groups.decorator';
import { Group } from 'src/guards/group.enum';

@Injectable()
export class GroupsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredGroups = this.reflector.getAllAndOverride<Group[]>(GROUPS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredGroups) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user)
      return false;

    const isAuthorized = requiredGroups.some((group) => user.groups?.includes(group));
    return isAuthorized;
  }
}
