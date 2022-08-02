import { wrapper } from "../store/store";
import { withAuth } from "./private";

const defaultFunc = async () => ({ props: {} });

export const reduxWithAuth = (gssp = defaultFunc) =>
  //@ts-ignore
  wrapper.getServerSideProps((store) => withAuth(gssp, store));
