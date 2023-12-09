import { User } from "../types";

const getUsers = async () => {
  try {
    const res = await fetch(
      "https://my-json-server.typicode.com/kayeskhanakash/test-server/users"
    );
    const users: User[] = await res.json();
    return users;
  } catch (e) {
    console.log(e);
  }
};

export default getUsers;
