export type CreateUserParams = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type UpdateUserParams = {
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  address?: string;
  phone?: string;
  image?: string;
};

export type CreateUserPostParams = {
  username: string;
  title: string;
  description: string;
  image: string;
};

export type UpdateUserPostParams = {
  username?: string;
  title?: string;
  description?: string;
  image?:string;
};