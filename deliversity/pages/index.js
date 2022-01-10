import Loader from "../components/Loader";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { getEstablishments } from "../lib/firebase";
import EstablishmentCard from "../components/EstablishmentCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export async function getServerSideProps() {
  const array = await getEstablishments();

  // JSON serializable data
  let establishment = null;

  if (array) {
    establishment = array;
  }

  return {
    props: { establishment }, // will be passed to the page component as props
  };
}

export default function Home({ establishment }) {
  //console.log(establishment);

  return (
    <div>
      <div className="container mx-auto">
        <div className="mx-4">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="h-96 rounded overflow-hidden shadow-lg m-4 "
          >
            <SwiperSlide className="text-center h-44">Offer 1</SwiperSlide>
            <SwiperSlide>Offer 2</SwiperSlide>
            <SwiperSlide>Offer 3</SwiperSlide>
          </Swiper>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {establishment.map((e) => {
              return <EstablishmentCard key={e.id} establishment={e} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
