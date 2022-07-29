import { GetServerSidePropsResult, NextPage } from "next";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { auth } from "../util/firebase";
import { withAuth } from "../components/private";
import { GetServerSidePropsContext } from "next";
import { selectAuthState, setUser } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store/store";
import { json } from "stream/consumers";
import { getDisplayName } from "next/dist/shared/lib/utils";
import SideBar from "../components/sideBar/sideBar";

const Home: NextPage = (props: any) => {
  const router = useRouter();
  const { data } = useGetCurrentUserQuery();
  const user = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <SideBar>
      <div></div>
    </SideBar>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore
  withAuth(async () => ({ props: {} }), store)
);

export default Home;
