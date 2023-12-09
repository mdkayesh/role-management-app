export type User = {
  id: number | string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  role: string;
  auth: {
    email: string;
    password: string;
  };
  friends: Friend[];
};

type Friend = {
  id: number | string;
  name: string;
};

export type ConfigType = {
  isAdmin: null | boolean;
  isSuperUser: null | boolean;
  isUser: null | boolean;
};
