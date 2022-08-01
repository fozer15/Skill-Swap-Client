import type { NextPage } from "next";
import Layout from "../components/layout";

const Index: NextPage = (props) => {
  return (
    //@ts-ignore
    <Layout>
      <div>
        <div className="h-[30rem] flex justify-evenly items-center mb-32">
          <h1 className="text-4xl max-w-lg text-emerald-800">
            Make new connections while learning
          </h1>
          <img
            src="pexels-ekaterina-bolovtsova-4049992.jpg"
            className=" h-96 rounded-2xl shadow-lg"
          />
        </div>

        {/* <div className="h-96p  flex justify-evenly items-center">
        <img
          src="pexels-matilda-wormwood-4099099.jpg"
          className=" h-96 rounded-2xl shadow-lg"
        />
        <h1 className="text-4xl ">The best form of Hanging Out with someone</h1>
      </div> */}
      </div>
    </Layout>
  );
};

export default Index;
