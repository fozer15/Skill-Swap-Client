import React, { Component, PropsWithChildren } from "react";
import { selectUserState, setUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../util/firebase";
import { useRouter } from "next/router";
import MenuItem from "./menuItem";

const SideBar: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector(selectUserState);
  const router = useRouter();

  return (
    <div className="h-full flex">
      <div className="flex flex-col items-center bg-white h-full p-10 border-r border-r-400 w-1/5 justify-between">
        <div className="flex items-center">
          <img src="skill-swap-logo.png" className="mr-2" width={55} />
          <span className="text-2xl">Skill Swap</span>
        </div>
        <div className="flex flex-col items-center">
          <MenuItem Text="Profile" url="/profile" />
          <MenuItem Text="Requests" />
          <MenuItem Text="My Exchanges" />
          <MenuItem Text="Home" url="/home" />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/WIN_20220611_20_34_38_Pro 16.png"
            width={120}
            className="mr-7"
          />
          <div>
            {" "}
            <div className="py-2 px-4 text-center bg-[#5D69A6] text-white rounded-3xl mb-2 text-base">
              <span>{user.first_name} </span>
              <span>{user.last_name}</span>
            </div>
            <button
              className="px-8 py-2 text-black rounded-3xl font-medium"
              onClick={async () => {
                try {
                  await auth.signOut();
                  router.push("/login");
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SideBar;
