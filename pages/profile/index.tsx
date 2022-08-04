import { NextPage } from "next";
import SideBar from "../../components/sideBar/sideBar";
import { reduxWithAuth } from "../../components/reduxWithAuth";
import { useGetUserSkillsQuery } from "../../generated/graphql";

const Home: NextPage = (props: any) => {
  const { data, loading } = useGetUserSkillsQuery();

  return (
    <SideBar>
      {loading ? (
        <>loading...</>
      ) : (
        <div className="p-10">
          {" "}
          {data?.getUserSkills.map((item) => {
            return <h1>{item.title}</h1>;
          })}{" "}
        </div>
      )}
    </SideBar>
  );
};

export const getServerSideProps = reduxWithAuth();

export default Home;
