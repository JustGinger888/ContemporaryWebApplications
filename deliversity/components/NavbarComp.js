import { Fragment } from "react";
import { auth } from "../lib/firebase";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ShoppingCartIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useShoppingCart } from "use-shopping-cart";

import { useContext } from "react";
import { UserContext } from "../lib/context";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Orders", href: "/orders", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const {
    cartCount,
  } = useShoppingCart();

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex  ml-10">
                <div className="flex-shrink-0 flex items-center text-center text-red-500">
                  <a
                    className="block lg:hidden h-8 w-auto text-2xl "
                    alt="Workflow"
                  >
                    DELIVERSITY
                  </a>
                  <p
                    className="hidden lg:block h-8 w-auto  text-2xl "
                    alt="Workflow"
                  >
                    DELIVERSITY
                  </p>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-6">
                    <a
                      key="Home"
                      href="/"
                      className={classNames(
                        router.pathname == "/"
                          ? "text-white bg-red-500 hover:bg-red-600"
                          : "text-gray-400 hover:bg-red-500 hover:text-white ",
                        "px-2 py-2 rounded-md text-sm "
                      )}
                    >
                      Home
                    </a>
                    {user && (
                      <>
                        <Link
                          href={{
                            pathname: "/orders/",
                            query: { id: `${user.uid}` },
                          }}
                        >
                          <a
                            key="Home"
                            className={classNames(
                              router.pathname == "/orders"
                                ? "text-white bg-red-500 hover:bg-red-600"
                                : "text-gray-400 hover:bg-red-500 hover:text-white ",
                              "px-2 py-2 rounded-md text-sm "
                            )}
                          >
                            Orders
                          </a>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {user && (
                <>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    
                  {cartCount > 0 && (
                    <div className="mb-7 ml-7 absolute text-center w-5 h-5 text-white bg-red-500 rounded-full">
                      {cartCount}
                    </div>
                  )}
                    <Link
                    href={{
                      pathname: "/cart/",
                      query: { id: `${user.uid}` },
                    }}
                      >
                        <a type="button"
                      className="bg-transparent w-10 h-10 p-2 text-sm rounded-full text-gray-400 hover:bg-red-500 hover:text-white "
                    >
                      <span className="sr-only">View shopping cart</span>
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                      </a>
                    </Link>
                    <div className="p-2"></div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative z-50	">
                      <div>
                        <Menu.Button className="flex text-sm rounded-full">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full border border-gray-400"
                            src={user.photoURL}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={{
                                  pathname: "/user/",
                                  query: { id: `${user.uid}` },
                                }}
                              >
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-400"
                                  )}
                                >
                                  Your Profile
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-400 "
                                )}
                                onClick={() =>
                                  signOut(auth)
                                    .then(() => {
                                      // Sign-out successful.
                                      router.push("/");
                                    })
                                    .catch((error) => {
                                      // An error happened.
                                    })
                                }
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </>
              )}

              {!user && (
                <>
                  <div className="px-1">
                    <Link href="/auth">
                      <button className="sm:w-auto md:w-24 bg-red-500 hover:bg-red-600 text-white hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded text-sm">
                        Sign In
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-red-500 text-white"
                      : "text-gray-400 hover:bg-gray-400 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
