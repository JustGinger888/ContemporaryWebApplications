import { NextPage } from "next";
import Products from "../../components/Products";
import { getUserByUid } from "../../lib/firebase";

import { useRouter } from "next/router";

import {
  setUserCart
  
} from "../../lib/firebase";

import { useContext } from "react";
import { UserContext } from "../../lib/context";
import React, { useState, useEffect } from "react";

import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../../utils/api-helpers";

export async function getServerSideProps({ query }) {
  const uid = query.id;

  const userDoc = await getUserByUid(uid);

  // JSON serializable data
  let user = null;

  if (userDoc) {
    console.log(userDoc);
    user = userDoc;
  }

  return {
    props: { user, uid }, // will be passed to the page component as props
  };
}

export default function CartPage({uid, user}) {
  const router = useRouter();

  if (!user) {
    router.push("/");
  }
  console.log(user);

  let numberInput = React.createRef();

  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    totalPrice,
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    loadCart,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const [number, setValue] = useState("");
  console.log(number);

  const handleCheckout = async (event) => {



    event.preventDefault();
    setLoading(true);

    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    const stripe = Stripe(
      "pk_test_51K8r12EFC6ZFCUDdjJTuzYXYniS3wFjiiTNouRe3v6Ro3Q1h8Ocb3pGr0gFEiS3a5qo9AWEeLqbQC2WQ1aB1voPq00p8hTBZMe"
    );

    console.log(response.id);
    const write = await setUserCart(uid, cartCount, totalPrice, response.id)

    let id = response.id.toString();
    console.log(id);
    const result = await stripe.redirectToCheckout({
      sessionId: response.id,
    });

    print("DID IT" + result);
  };

  let arr = Object.entries(cartDetails);

  console.log(cartDetails);
  let names = [];
  let prices = [];
  {
    arr.forEach(([key, value]) => {
      names.push(
        <div>
          {value.quantity}x {value.name}
        </div>
      );
      prices.push(<div>{value.formattedValue}</div>);
    });
  }

  return (
    <div>
      <form onSubmit={handleCheckout}>
        <div className="container mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded overflow-hidden shadow-lg my-4 mx-2 bg-white md:col-span-2 lg:col-span-3">
              <div className="px-6 py-4 md:my-40 mx-2 md:mx-8 lg:mx-48 flex flex-wrap content-center">
                <div className="font-bold text-xl mb-2 w-full py-4 text-center text-red-500">
                  Details
                </div>
                <input
                  type="text"
                  name="email"
                  required='true'
                  className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                  placeholder={user.name}
                  disabled="true"
                />
                <input
                  type="text"
                  name="room"
                  required='true'
                  className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                  placeholder="University Room"
                />
                <input
                  type="text"
                  name="room"
                  required='true'
                  ref={numberInput}
                  value={user.number != null ? user.number : null}
                  placeholder="Contact Number"
                  className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"

                />
                <textarea
                  rows="8"
                  name="request"
                  className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                  placeholder="Special Requests"
                />
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg my-0 md:my-4 mx-2 bg-white">
              <div className="px-6 py-4">
                <div>
                  <div className="font-bold text-xl mb-2 py-4 text-red-500">
                    Basket
                  </div>

                  {cartCount > 0 ? (
                    <div>
                      <div className="grid grid-cols-2">
                        <div>{names}</div>
                        <div className="text-right ">{prices}</div>
                      </div>
                      <hr className="my-2" />
                      <div className="grid grid-cols-2">
                        <div>Subtotal</div>
                        <div className="text-right ">{formattedTotalPrice}</div>
                      </div>

                      <button
                        className="inline-block py-2 my-4 text-md font-semibold text-center w-full text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
                        type="submit"
                        disabled={cartEmpty || loading}
                      >
                        Checkout
                      </button>
                    </div>
                  ) : (
                    <div>Your cart is Empty</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
