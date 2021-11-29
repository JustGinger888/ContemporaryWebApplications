import { auth, googleAuthProvider } from "../../lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../lib/context";

export default function Login() {
  const { user, username } = useContext(UserContext);

  return (
    <div>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
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
                    <a
                      href="#_"
                      className="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
                    >
                      Get Started Today
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full  bg-white lg:w-6/12 xl:w-5/12">
                <div className="flex  flex-col items-left justify-center w-full h-screen p-10 lg:p-16 xl:p-24">
                  <h4 className="w-full text-3xl font-bold">Login</h4>
                  <p className="text-lg text-gray-500">
                    or, if you don't have an account you can{" "}
                    <a href="/auth/register" className="text-red-500 underline">
                      sign up
                    </a>
                  </p>
                  <div className="relative w-full mt-10 space-y-8">
                    <div className="relative">
                      <label className="font-medium text-gray-900">Email</label>
                      <input
                        type="text"
                        className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                        placeholder="Enter Your Email Address"
                      />
                    </div>
                    <div className="relative">
                      <label className="font-medium text-gray-900">
                        Password
                      </label>
                      <input
                        type="password"
                        className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                        placeholder="Password"
                      />
                    </div>
                    <div className="relative">
                      <a
                        href="#_"
                        className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
                      >
                        Sign in with Email
                      </a>
                      <SignInButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Sign in with Google button
function SignInButton() {
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
      className="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return (
    <button
      onClick={() =>
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          })
      }
    >
      Sign Out
    </button>
  );
}

function UsernameForm() {
  return <div>Hello</div>;
}
