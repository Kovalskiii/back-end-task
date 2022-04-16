export const listRoles = [
  'admin',
  'blogger', //default user
];

const roles = {

  admin: [
    // POSTS
    'post.create',
    'post.update',
    'post.delete',
    'post.search',
    'post.get.all'

  ],

  blogger: [
    // POSTS
    'post.create',
    'post.update',
    'post.delete',
    'post.search',
    'post.get.all'

  ],

};
export default roles;
