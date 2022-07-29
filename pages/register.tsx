import type { NextPage } from "next";
import { Formik } from "formik";
import Layout from "../components/layout";
import { useRegisterMutation } from "../generated/graphql";
import { auth, createUserWithEmailAndPassword } from "../util/firebase";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    //@ts-ignore
    <Layout>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center w-60">
          <div className="flex items-center mb-12">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              width={35}
              className="mr-5"
            />
            <span>Sign Up with Google</span>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
              first_name: "",
              last_name: "",
              confirm_password: "",
            }}
            validate={(values) => {}}
            onSubmit={async (
              { email, password, first_name, last_name, confirm_password },
              { setSubmitting, setErrors }
            ) => {
              try {
                if (password != confirm_password) {
                  throw new Error("invalid password");
                }
                await createUserWithEmailAndPassword(auth, email, password);
                await register({
                  variables: {
                    user: {
                      email,
                      password,
                      first_name,
                      last_name,
                    },
                  },
                });
                router.push(`/login?email=${email}`);
              } catch (err) {
                const errs: any = err;
                if (!errs.code) {
                  errs.code = errs.message;
                } else {
                  errs.code = errs.code.split("/")[1].split("-").join(" ");
                }
                setErrors({
                  email: errs.code,
                });
              }

              setSubmitting(false);
            }}
          >
            {({
              errors,
              values,
              status,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <span
                  className={
                    "w-full flex justify-center mb-5 font-medium text-red-600"
                  }
                >
                  {errors.email}
                </span>
                <input
                  id="first_name"
                  type="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  value={values.first_name}
                />
                <input
                  id="last_name"
                  type="surname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last Name"
                  value={values.last_name}
                />
                <input
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  value={values.email}
                />

                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  mb-3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  value={values.password}
                />

                <input
                  type="password"
                  id="confirm_password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm Password"
                  value={values.confirm_password}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ background: "#3BB6B5" }}
                  className="block px-4 py-2 text-white rounded-xl  mt-6 self-end text-sm"
                >
                  Sign up
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
