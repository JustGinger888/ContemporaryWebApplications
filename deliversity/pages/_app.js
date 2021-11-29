import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
    const userData = useUserData();

  return (
    // <UserContext.Provider value={{user:"jj", username:"dd"}}>
    
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
      <Footer />
    </UserContext.Provider>
  );
}

export default MyApp;
