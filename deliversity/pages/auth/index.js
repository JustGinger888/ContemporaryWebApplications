import {
  auth,
  getUserById,
  googleAuthProvider,
  githubAuthProvider,
  SignInGoogle,
  SignInGithub
} from "../../lib/firebase";


import { UserContext } from "../../lib/context";
import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { isError } from "lodash";

export default function Login() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (user) {
    router.push("/");
  }
  return (
    <div>
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row">
            <div className=" hidden lg:block relative h-screen w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
              <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
                <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                  <div className="relative">
                    <p className="mb-2 font-medium text-gray-700 uppercase">
                      Work smarter
                    </p>
                    <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                      Features to help you work smarter
                    </h2>
                  </div>
                  <p className="text-2xl text-gray-700">
                    We've created a simple formula to follow in order to gain
                    more out of your business and your application.
                  </p>
                  {/* <a
                    href="#_"
                    className="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
                  >
                    Get Started Today
                  </a> */}
                </div>
              </div>
            </div>

            <div className="w-full  bg-white lg:w-6/12 xl:w-5/12">
              <div className="flex  flex-col items-left justify-center w-full h-screen p-10 lg:p-16 xl:p-24">
                <h4 className="w-full text-3xl font-bold">Welcome...</h4>
                <p className="text-lg text-gray-500">
                  Choose a sign in provider to get started
                </p>
                <div className="relative w-full mt-10 space-y-8">
                  <div className="relative">
                    <SignInGoogle />
                    <SignInGithub />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sign in with Google button

