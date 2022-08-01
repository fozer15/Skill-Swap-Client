import { NextPage } from "next";
import SideBar from "../../components/sideBar/sideBar";
import { reduxWithAuth } from "../../components/reduxWithAuth";

const Home: NextPage = (props: any) => {
  return (
    <SideBar>
      <div className="p-10"> PROFILE </div>
    </SideBar>
  );
};

export const getServerSideProps = reduxWithAuth();

export default Home;
