import { ConfigType, User } from "../types";
import { HiXMark } from "react-icons/hi2";

type UserModalType = {
  isOpenId: string;
  setisOpenId: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  activeUser: User;
  config: ConfigType;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
};

const UserModal = ({
  isOpenId,
  setisOpenId,
  user,
  activeUser,
  config,
  setUser,
}: UserModalType) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 bg-[#000000bc] px-4 md:px-10 py-5 md:py-10 flex justify-center items-center min-h-screen ${
        isOpenId === user.id.toString()
          ? "visible opacity-100"
          : "invisible opacity-0"
      } transition-all duration-300`}
      onClick={() => setisOpenId("")}
    >
      <div
        className={`innerModal  relative rounded-lg bg-bg_secondary w-full max-w-lg p-10 flex flex-col items-center h-full overflow-auto ${
          isOpenId === user.id.toString() ? "translate-y-0" : "translate-y-3"
        } transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="text-3xl absolute top-2 right-2 text-gray-50"
          title="close"
          onClick={() => setisOpenId("")}
        >
          <HiXMark />
        </button>
        <img
          className={`rounded-full w-20 h-20 ${
            activeUser.id === user.id ? "border-2 border-primary" : ""
          }`}
          src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
          alt="unsplash image"
        />
        <h1 className="text-2xl sm:text-3xl font-semibold mt-6 text-gray-100 text-center">{`${user.first_name} ${user.last_name}`}</h1>
        {(config.isAdmin ||
          config.isSuperUser ||
          user.id === activeUser.id) && (
          <p className="text-gray-300 mt-1 text-base text-center">
            {user.email}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full mt-7 text-lg">
          <div className="flex flex-col justify-items-center">
            <p className="text-gray-400 font-semibold uppercase">Role</p>
            <p className="text-gray-100">{user.role}</p>
          </div>
          <div className="flex flex-col justify-items-center">
            <p className="text-gray-400 font-semibold uppercase">Gender</p>
            <p className="text-gray-100">{user.gender}</p>
          </div>
          {config.isAdmin && (
            <div className="flex flex-col justify-items-center">
              <p className="text-gray-400 font-semibold uppercase">
                Ip Address
              </p>
              <p className="text-gray-100">{user.ip_address}</p>
            </div>
          )}
        </div>
        <div className="mt-6 w-full text-base flex justify-between items-center">
          <div>
            <h3 className="text-gray-400 font-semibold uppercase text-lg">
              Friends
            </h3>
            <ul className="mt-2">
              {user.friends.map((friend, index) => (
                <li
                  key={friend.id}
                  className="flex gap-4 items-center text-gray-100"
                >
                  <span>{index + 1}</span>
                  <span>{friend.name}</span>
                </li>
              ))}
            </ul>
          </div>
          {user.id === activeUser.id && (
            <button
              type="button"
              className="border border-primary rounded-lg uppercase font-semibold text-gray-200 py-2 px-5 hover:bg-primary"
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
              }}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
