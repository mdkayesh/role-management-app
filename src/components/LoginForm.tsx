import { useState } from "react";
import authUser from "../lib/authUser";
import { User } from "../types";

type loginFormProps = {
  user: null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
};
const LoginForm = ({ setUser }: loginFormProps) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    authUser(formData.email, formData.password)
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full flex justify-center items-center flex-col min-h-screen">
      <h1 className="text-center text-4xl font-semibold uppercase mb-6">
        Log In
      </h1>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChanges}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChanges}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          {error && <p className="text-red-600 mb-4">User not found!</p>}
          <div className="flex justify-center">
            <button type="submit">
              {isLoading ? "SENDING" : "SEND"}
              <span></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
