import { Profile } from 'src/services/profile/profile.model';

export const ProfileSeedData: Profile[] = [
  {
    _id: '61288d28b4484d717b8ce494',
    username: 'whattheuser',
    email: 'some.emailhere@gmail.com',
    image: 'https://placedog.net/900/650/b',
    summary: 'just a small town boy, living in a hello world!',
    createdAt: new Date(),
    modifiedAt: new Date(),
    disabled: false,
  __v: 1,
  },
  {
    _id: '61288d28b4484d717b8ce496',
    username: 'whattheadmin',
    email: 'fake@email.com',
    image: 'https://placedog.net/900/650/b',
    summary: 'just a small town boy, living in a hello world!',
    createdAt: new Date(),
    modifiedAt: new Date(),
    disabled: false,
  __v: 1,
  },
];