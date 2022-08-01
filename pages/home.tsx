import { NextPage } from "next";
import { reduxWithAuth } from "../components/reduxWithAuth";
import { useDispatch } from "react-redux";
import SideBar from "../components/sideBar/sideBar";

const Home: NextPage = (props: any) => {
  const dispatch = useDispatch();
  return (
    <SideBar>
      <div className="p-10">HOME</div>
    </SideBar>
  );
};

export const getServerSideProps = reduxWithAuth();

export default Home;
