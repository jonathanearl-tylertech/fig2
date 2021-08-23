import { Profile } from "../../entities/profile.entity";
import { UpdateProfileDto } from "../../dto/update-profile.dto";

export interface IProfileService {
  findAll(): Promise<Profile[]>;
  findOne(username: string): Promise<Profile>;
  create(profile: Partial<Profile>): Promise<Profile>;
  update(username: string, updateProfileDto: UpdateProfileDto): Promise<Profile>;
  ImportMock(): Promise<any>;
}

