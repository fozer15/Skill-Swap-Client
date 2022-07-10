import { NextPage } from "next";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { auth } from "../util/firebase";

const Home: NextPage = () => {
  const { data, loading } = useGetCurrentUserQuery();
  const router = useRouter();
  //
  return (
    <div>
      <div className="flex px-20 py-11">
        <button
          style={{ background: "rgb(59, 182, 181)" }}
          className="px-8 py-2 text-white rounded-3xl"
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
      {loading ? (
        <span> fetching current user ... </span>
      ) : (
        <div>{JSON.stringify(data)}</div>
      )}
    </div>
  );
};

export default Home;
