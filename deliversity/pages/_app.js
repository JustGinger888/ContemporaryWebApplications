import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

import { CartProvider } from 'use-shopping-cart';

import getStripe from '../utils/get-stripejs';

import "../styles.css";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    // <UserContext.Provider value={{user:"jj", username:"dd"}}>
    <CartProvider
      mode="checkout-session"
      successUrl="/orders"
      stripe={getStripe()}
      currency='GBP'
    >
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
        <Footer />
      </UserContext.Provider>
    </CartProvider>
  );
}

export default MyApp;
