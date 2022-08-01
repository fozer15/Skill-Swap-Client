import { useState } from "react";
import { reduxWithAuth } from "../components/reduxWithAuth";
import { NextPage } from "next";
import usePortal from "react-cool-portal";

interface Skill {
  title: string;
  description: string;
  type: number;
}

const CreateProfile: NextPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const { Portal, isShow, show, hide, toggle } = usePortal({
    defaultShow: false, // The default visibility of portal, default is true
    onShow: (e) => {
      // Triggered when portal is shown
      // The event object will be the parameter of `show(e?)`
    },
    onHide: (e) => {
      // Triggered when portal is hidden
      // The event object will be the parameter of `hide(e?)`, it maybe MouseEvent (on clicks outside) or KeyboardEvent (press ESC key)
    },
  });

  return (
    <div className="h-full flex flex-col items-center p-10">
      <h1 className="flex items-center text-2xl mb-40">
        {" "}
        <img src="skill-swap-logo.png" className="mr-2" width={55} /> Create
        Your Profile
      </h1>
      <div>
        <div className="mb-40">
          <div className="flex items-center justify-between">
            <h1 className="text-xl">Skills That You Want to Learn </h1>
            <button
              onClick={() => setSkills((prev) => [...prev])}
              className="bg-[#5D69A6] text-white py-2 px-4 rounded-xl ml-24"
            >
              Add +
            </button>
          </div>
          <div></div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl">Skills That You Have</h1>
            <button className="bg-[#5D69A6] text-white py-2 px-4 rounded-xl ml-10">
              Add +
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = reduxWithAuth();

export default CreateProfile;
