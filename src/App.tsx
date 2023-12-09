import { useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { User } from "./types";
import UsersTable from "./components/UsersTable";
import Loader from "./components/Loader";
import getUsers from "./lib/getUsers";
function App() {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [users, setUsers] = useState<User[] | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(true);

  // GET USER FROM LOCAL STORAGE
  useEffect(() => {
    setIsLoading(true);
    const _user: User | null =
      JSON.parse(localStorage.getItem("user") as string) || null;
    setUser(_user);

    getUsers()
      .then((res) => {
        setUsers(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [setUser, user?.id]);

  return (
    <div className="app p-6">
      {isLoading && <Loader />}
      {!isLoading && !user && <LoginForm user={user} setUser={setUser} />}
      {!isLoading && user && (
        <UsersTable users={users || []} activeUser={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
