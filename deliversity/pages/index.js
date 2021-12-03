import Loader from "../components/Loader";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function Home() {
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
        className="h-80 rounded overflow-hidden shadow-lg m-4 "
      >
        <SwiperSlide className="text-center h-44">Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      </div >
      <div className="mb-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded overflow-hidden shadow-lg m-4 bg-white">
            <img
              className="w-full"
              src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9uZG9uJTIwY2FmZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-4 pt-2 pb-2">
              <a
                href="/"
                className="inline-block px-3 py-2 my-3 text-md font-semibold text-center w-full text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
              >
                Menu
                <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
