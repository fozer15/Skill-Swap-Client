import { useState } from "react";
import { reduxWithAuth } from "../components/reduxWithAuth";
import { NextPage } from "next";
import usePortal from "react-cool-portal";

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

  return (
    <div className="h-full flex flex-col items-center p-12 ">
      <h1 className="flex items-center text-2xl mb-36">
        {" "}
        <img src="skill-swap-logo.png" className="mr-2" width={55} /> Create
        Your Profile
      </h1>
      <div className="w-2/6 flex flex-col relative h-full">
        <div className="mb-40">
          <div className="flex items-center justify-between">
            <h1 className="text-xl">Skills That You Want to Learn </h1>
            <button
              onClick={(e) => {
                setSelectedType(1);
                show(e);
              }}
              className="bg-[#3BB6B5] text-white rounded-full ml-24 text-xl w-8 h-8 font-semibold"
            >
              +
            </button>
          </div>
          <div className="flex mt-8 flex-wrap flex-col">
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

        <div>
          <div className="flex items-center justify-between ">
            <h1 className="text-xl">Skills That You Have</h1>
            <button
              onClick={(e) => {
                setSelectedType(2);
                show(e);
              }}
              className="bg-[#3BB6B5] text-white rounded-full ml-24 text-xl w-8 h-8 font-semibold"
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

        <button className="absolute right-0 bottom-28 flex items-center text-xl ">
          Done{" "}
          <i className="fas text-2xl fa-angle-right ml-4 text-[#3BB6B5] "></i>
        </button>

        <Portal>
          <div className="modal" tabIndex={-1}>
            <div
              className="rounded-lg modal-dialog bg-white translate-y-32 p-6"
              role="dialog"
              aria-labelledby="modal-label"
              aria-modal="true"
            >
              <div className="flex flex-col">
                <input
                  id="title"
                  placeholder="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                ></input>
                <textarea
                  id="description"
                  placeholder="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-3 h-32 "
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
    </div>
  );
};

export const getServerSideProps = reduxWithAuth();

export default CreateProfile;
