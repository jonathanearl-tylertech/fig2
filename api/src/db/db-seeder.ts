import { PostModel } from 'src/post/db/post.model';
import { ProfileModel } from 'src/profile/db/profile.model';
import { ProfileSeedData } from './data/profiles';
import { PostSeedData } from './data/posts';

export class DbSeeder {
  async seedProfiles() {
    for (let profile of ProfileSeedData) {
      try { await ProfileModel.create(profile); } 
      catch(err) { }
    }
  }

  async seedPosts() {
    for (let post of PostSeedData) {
      try { const result = await PostModel.create(post); }
      catch(err) { }
    }
    for (let i = 0; i < 11; i++) {
      try { const result = await PostModel.create(PostSeedData[0]); }
      catch(err) { }
    }
  }

  async drop() {
    try {
      await PostModel.deleteMany({});
      await ProfileModel.deleteMany({});
    } catch (err) {
      console.error('issue droping databse', err);
    }
  }
}
