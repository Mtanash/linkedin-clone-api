type User = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar?: string;
  posts: string[];
};

export default User;
