import { Profile } from 'src/profile/entities/profile.entity';

export const ProfileSeedData: Profile[] = [
  {
    _id: '61288d28b4484d717b8ce494',
    username: 'whattheuser',
    issuers: {default: "00u3wmcpnofpVOsp24x7"},
    profileImgUrl: 'https://placedog.net/900/650/b',
    summary: 'just a small town boy, living in a hello world!',
    createdAt: new Date(),
    modifiedAt: new Date(),
  __v: 1,
  },
  {
    _id: '61288d28b4484d717b8ce496',
    username: 'whattheadmin',
    issuers: {default: '1'},
    profileImgUrl: 'https://placedog.net/900/650/b',
    summary: 'just a small town boy, living in a hello world!',
    createdAt: new Date(),
    modifiedAt: new Date(),
  __v: 1,
  },
];