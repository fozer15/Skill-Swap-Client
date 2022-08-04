import { useState } from "react";
import { reduxWithAuth } from "../components/reduxWithAuth";
import { NextPage } from "next";
import usePortal from "react-cool-portal";
import { selectUserState } from "../store/authSlice";
import { useSelector } from "react-redux";
import { useCreateProfileMutation } from "../generated/graphql";
import { useRouter } from "next/router";

//@ts-ignore
import { v4 as uuidv4 } from "uuid";

interface Skill {
  title: string;
  description: string;
  type: number;
  id: string;
}

const CreateProfile: NextPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const { Portal, isShow, show, hide, toggle } = usePortal({
    defaultShow: false,
    onShow: (e) => {},
    onHide: (e) => {},
  });

  const [selectedType, setSelectedType] = useState<number>();
  const user = useSelector(selectUserState);
  const [createProfile, { loading }] = useCreateProfileMutation();
  const router = useRouter();

  return (
    <>
      <div className="h-full flex flex-col items-center p-8 ">
        <h1 className="flex items-center text-xl mb-12">
          {" "}
          <img src="skill-swap-logo.png" className="mr-2" width={45} />
          Create Your Profile
        </h1>
        <h1 className="w-5/6 text-xl mb-8 ">
          <span className="mr-2">👋</span> Hi{" "}
          {user.first_name + " " + user.last_name}, it is time for you to create
          your profile !
        </h1>
        <div className="flex relative h-full w-5/6 justify-between mb-12">
          <div className="border border-with p-10 flex-[0.47] rounded-xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl"> Skills That You Want to Learn </h1>
              <button
                onClick={(e) => {
                  setSelectedType(1);
                  show(e);
                }}
                className="bg-[#5D69A6] text-white rounded-full ml-24 text-xl w-8 h-8 font-semibold"
              >
                +
              </button>
            </div>
            <div className="flex mt-8 flex-wrap">
              {skills.map(({ title, type, id }) => {
                if (type === 1)
                  return (
                    <div className="flex items-center mb-4">
                      {" "}
                      <div className="flex justify-center items-center rounded-xl text-lg ml-4 py-1 px-3 border text-white bg-[#FF7A00]">
                        {title}
                      </div>
                      <i
                        onClick={(e) => {
                          setSkills((prev) =>
                            prev.filter(
                              ({ id: to_be_removed }) => to_be_removed != id
                            )
                          );
                        }}
                        className="text-[#CF2F2F] ml-4 font-semibold fas fa-times cursor-pointer"
                      ></i>
                    </div>
                  );
              })}
            </div>
          </div>

          <div className="border border-with p-10 flex-[0.47] rounded-xl">
            <div className="flex items-center justify-between ">
              <h1 className="text-xl">Skills That You Have</h1>
              <button
                onClick={(e) => {
                  setSelectedType(2);
                  show(e);
                }}
                className="bg-[#5D69A6] text-white rounded-full ml-24 text-xl w-8 h-8 font-semibold"
              >
                +
              </button>
            </div>
            <div className="flex mt-8 flex-wrap">
              {skills.map(({ title, type, id }) => {
                if (type === 2)
                  return (
                    <div className="flex items-center">
                      {" "}
                      <div className="flex justify-center items-center rounded-xl text-lg ml-4 py-1 px-3 border text-white bg-[#3BB6B5]">
                        {title}
                      </div>
                      <i
                        onClick={(e) => {
                          setSkills((prev) =>
                            prev.filter(
                              ({ id: to_be_removed }) => to_be_removed != id
                            )
                          );
                        }}
                        className="text-[#CF2F2F] ml-4 font-semibold fas fa-times cursor-pointer"
                      ></i>
                    </div>
                  );
              })}
            </div>
          </div>

          <Portal>
            <div className="modal" tabIndex={-1}>
              <div
                className="relative rounded-lg modal-dialog bg-white translate-y-32 p-10"
                role="dialog"
                aria-labelledby="modal-label"
                aria-modal="true"
              >
                <i
                  onClick={hide}
                  className="text-[#CF2F2F] ml-4 font-semibold fas fa-times cursor-pointer top-1 right-3 absolute text-2xl"
                />
                <div className="flex flex-col">
                  <input
                    id="title"
                    placeholder="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  ></input>
                  <textarea
                    id="description"
                    placeholder="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-5 h-32 "
                  ></textarea>
                  <button
                    onClick={(e) => {
                      const title = (
                        document.querySelector<HTMLInputElement>(
                          "#title"
                        ) as HTMLInputElement
                      ).value;
                      const description = (
                        document.querySelector<HTMLInputElement>(
                          "#description"
                        ) as HTMLInputElement
                      ).value;

                      if (title && description) {
                        setSkills((prev) =>
                          prev.concat({
                            title,
                            description,
                            type: selectedType as number,
                            id: uuidv4(),
                          })
                        );
                        hide(e);
                      }
                    }}
                    className="bg-[#5D69A6] text-white rounded-full ml-10 text-xl w-8 h-8 font-semibold self-end mt-8"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </Portal>
        </div>
        <div className="w-5/6 flex justify-end mb-8">
          <button
            className={
              "flex items-center text-xl" +
              (skills.length == 0 ? " text-gray-400" : "")
            }
            disabled={skills.length === 0 || loading}
            onClick={async () => {
              await createProfile({
                variables: {
                  skills,
                },
              });

              router.push("/home");
            }}
          >
            Done{" "}
            <i
              className={
                "fas text-2xl fa-angle-right ml-4" +
                (skills.length == 0 ? " text-gray-400" : " text-[#3BB6B5]")
              }
            ></i>
          </button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = reduxWithAuth(async (ctx, user) => {
  if (user.isProfileCreated) {
    return {
      redirect: {
        destination: "/home",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
});

export default CreateProfile;
