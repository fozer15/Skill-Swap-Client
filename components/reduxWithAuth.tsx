import { wrapper } from "../store/store";
import { withAuth } from "./private";
import { GetServerSidePropsContext, GetServerSideProps } from "next";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  isProfileCreated: boolean;
}

const defaultFunc = async (ctx: GetServerSidePropsContext, user: User) => ({
  props: {},
});

export const reduxWithAuth = (gssp = defaultFunc) =>
  //@ts-ignore
  wrapper.getServerSideProps((store) => withAuth(gssp, store));
