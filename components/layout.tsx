import Link from "next/link";
import React, { FC, ReducerAction } from "react";

const Layout: React.FC = (props: any) => {
  return (
    <div>
      <div className="flex justify-between px-20  py-11 pb-10 mb-24">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <img src="skill-swap-logo.png" className="mr-2" width={55} />
              <span className="text-2xl">Skill Swap</span>
            </a>
          </Link>
        </div>

        <div className="flex items-center">
          <Link href={"/login"}>
            <a className="block px-8 py-2 rounded-3xl mr-4 border">
              Login
              <i className="fa-solid fa-house" />
            </a>
          </Link>

          <Link href={"/register"}>
            <a
              style={{ background: "#3BB6B5" }}
              className="block px-8 py-2 rounded-3xl mr-8 border text-white"
            >
              Sign Up
            </a>
          </Link>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Layout;
