import { SetMetadata } from '@nestjs/common';
import { Group } from 'src/guards/group.enum';

export const GROUPS_KEY = 'groups';
export const Groups = (...roles: Group[]) => SetMetadata(GROUPS_KEY, roles);