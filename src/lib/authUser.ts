import { User } from "../types";
import getUsers from "./getUsers";

const authUser = async (email: string, password: string) => {
  let activeUser: User | undefined | null = null;

  const users: User[] | undefined = await getUsers();

  activeUser = users?.find(
    (user) => user.auth.email === email && user.auth.password === password
  );

  if (!activeUser) throw new Error("user not found");

  return activeUser;
};

export default authUser;
