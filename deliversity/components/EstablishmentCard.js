
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EstablishmentCard({ establishment }) {
  return (

        <div className="rounded overflow-hidden shadow-lg m-4 bg-white">
          <img
            className="w-full h-60"
            src={establishment.url}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{establishment.name}</div>
            <p className="text-gray-700 text-base">{establishment.desc}</p>
          </div>
          <div className="px-4 pt-2 pb-2">
            <a
              href={establishment.id}
              className="inline-block px-3 py-2 my-3 text-md font-semibold text-center w-full text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
            >
              Menu
              <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
            </a>

      </div>
    </div>
  );
}
