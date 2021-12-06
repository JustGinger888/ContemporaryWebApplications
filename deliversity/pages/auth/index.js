import {
  auth,
  getUserById,
  googleAuthProvider,
  githubAuthProvider,
} from "../../lib/firebase";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
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
function SignInGoogle() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Logged IN");
        // ...


        getUserById(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <button
      className="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
      onClick={signInWithGoogle}
    >
      <FontAwesomeIcon className="mr-4" icon={faGoogle} />
      Sign in with Google
    </button>
  );
}

// Sign in with Github button
function SignInGithub() {
  const signInWithGithub = async () => {
    await signInWithPopup(auth, githubAuthProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        // ...
        getUserById(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <button
      className="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-black ease"
      onClick={signInWithGithub}
    >
      <FontAwesomeIcon className="mr-4" icon={faGithub} />
      Sign in with Github
    </button>
  );
}
