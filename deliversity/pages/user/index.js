import { getUserByUid } from "../../lib/firebase";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const id = query.id;

  const userDoc = await getUserByUid(id);

  // JSON serializable data
  let user = null;

  if (userDoc) {
    console.log(userDoc);
    user = userDoc;
  }

  return {
    props: { user }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user }) {
  const router = useRouter();

  if (!user) {
    router.push("/");
  }
  return (
    <div>
      <div className="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="rounded overflow-hidden shadow-lg my-4 mx-2 bg-white md:col-span-1 lg:col-span-1">
            <div className="px-6 py-4 md:my-28 mx-2 md:mx-8 lg:mx-12 flex flex-wrap content-center">
              <img
                className="mx-auto h-48 w-48 rounded-full border border-gray-400"
                src={user.url}
                alt=""
              />

              <div className="font-bold text-xl mb-2 w-full py-4 text-center text-red-500">
                Personal Details
              </div>
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                placeholder="Email"
                value={user.email}
                disabled
              />
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Full Name
              </label>
              <input
                type="text"
                name="text"
                className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                placeholder="Full Name"
                value={user.name}
              />
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Contact Number
              </label>
              <input
                type="text"
                name="number"
                className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                placeholder="Contact Number"
                value={user.number}
              />
              <button
                className="inline-block px-3 py-3 my-1 text-md font-semibold text-center w-full text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"

              >
                Update
              </button>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg my-0 md:my-4 mx-2 bg-white">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 py-4 text-red-500">
                PLACEHOLDER
              </div>
              <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
