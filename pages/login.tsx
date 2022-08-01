import type { NextPage } from "next";
import { Formik } from "formik";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { auth, signInWithEmailAndPassword } from "../util/firebase";

type Query = {
  email?: string;
};

type Props = {
  query?: Query;
};

const Login: NextPage<Props> = (props) => {
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
            <span>Login with Google</span>
          </div>
          <Formik
            initialValues={{ email: props?.query?.email || "", password: "" }}
            validate={(values) => {}}
            onSubmit={async (
              { email, password },
              { setSubmitting, setErrors }
            ) => {
              try {
                await signInWithEmailAndPassword(auth, email, password);
                router.push("/home");
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
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <span className="w-full flex justify-center mb-5 text-red-600 font-medium">
                  {errors.email}
                </span>
                <span className="w-full flex justify-center mb-5 text-green-700 font-medium">
                  {props?.query?.email && "Lets sign in !"}
                </span>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  value={values.password}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ background: "#3BB6B5" }}
                  className="block px-4 py-2 text-white rounded-xl  mt-6 self-end text-sm"
                >
                  Login
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

Login.getInitialProps = ({ query }) => {
  return {
    query,
  };
};

export default Login;
