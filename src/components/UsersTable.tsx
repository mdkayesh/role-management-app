import { ConfigType, User } from "../types";
import { GoKebabHorizontal } from "react-icons/go";
import UserModal from "./UserModal";
import { useState } from "react";

type UsersTableType = {
  users: User[];
  activeUser: User;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
};

const UsersTable = ({ users, activeUser, setUser }: UsersTableType) => {
  const [isOpen, setIsOpen] = useState("");

  const config: ConfigType = {
    isAdmin: activeUser.role === "admin",
    isSuperUser: activeUser.role === "super_user",
    isUser: activeUser.role === "user",
  };

  return (
    <>
      <h1 className="text-center font-semibold text-3xl text-gray-100">
        Role Management App
      </h1>
      <div className="mt-12">
        <div className="w-full overflow-auto">
          <table className="table text-gray-400 border-separate text-sm overflow-auto min-w-[600px] max-w-2xl w-full mx-auto">
            <thead className="bg-[#1d1d1d] text-gray-300">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3 text-left">Role</th>
                {config.isAdmin && (
                  <th className="p-3 text-left">IP Address</th>
                )}
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="bg-[#1d1d1d] hover:bg-[#2a2a2a]" key={user.id}>
                  <td className="p-3">
                    <div className="flex align-items-center">
                      <img
                        className={`rounded-full h-12 w-12 object-cover ${
                          user.id === activeUser.id
                            ? "border-2 border-primary"
                            : ""
                        }`}
                        src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                        alt="unsplash image"
                      />
                      <div className="ml-3">
                        <div className="text-gray-200">
                          <span className="line-clamp-1">{`${user.first_name} ${user.last_name}`}</span>
                        </div>
                        {(config.isAdmin ||
                          config.isSuperUser ||
                          user.id === activeUser.id) && (
                          <div className="text-gray-500 line-clamp-1">
                            {user.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`${
                        user.role === "admin"
                          ? "bg-green-600"
                          : user.role === "super_user"
                          ? "bg-primary"
                          : "bg-gray-900"
                      } inline-block px-2 pb-1 font-semibold rounded-lg text-white`}
                    >
                      {user.role}
                    </span>
                  </td>
                  {activeUser.role === "admin" && (
                    <td className="p-3 font-bold">{user.ip_address}</td>
                  )}
                  <td className="p-3">
                    <span className="px-2">{user.gender}</span>
                  </td>
                  <td className="p-3">
                    <button
                      title="more"
                      type="button"
                      className="rotate-90 text-xl flex justify-center items-center w-full"
                      onClick={() => setIsOpen(user.id.toString())}
                    >
                      <GoKebabHorizontal />
                    </button>
                    <UserModal
                      isOpenId={isOpen}
                      setisOpenId={setIsOpen}
                      user={user}
                      activeUser={activeUser}
                      config={config}
                      setUser={setUser}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
