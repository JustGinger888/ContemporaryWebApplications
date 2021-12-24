import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderCard({ order }) {
  const val = (order.total / 100).toFixed(2);
  console.log(order.itemMap);
  return (
    <div className="rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{order.name}</div>
        <p className="text-gray-700 text-base">
          {order.items} items · £{val}
        </p>

        <hr className="my-2" />
        <div className="font-bold text-xl mb-2 py-2">
          Status: <span className="font-normal">{order.status}</span>
        </div>
        <div className=" flex space-x-4">
          {order.status == "Placed" && (
            <>
              <div className="h-4 bg-red-500 animate-pulse rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </>
          )}
          {order.status == "Processing" && (
            <>
              <div className="h-4 bg-red-500 rounded w-1/3"></div>
              <div className="h-4 bg-red-500 animate-pulse rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </>
          )}
          {order.status == "Delivering" && (
            <>
              <div className="h-4 bg-red-500 rounded w-1/3"></div>
              <div className="h-4 bg-red-500 rounded w-1/3"></div>
              <div className="h-4 bg-red-500 animate-pulse rounded w-1/3"></div>
            </>
          )}
          {order.status == "Completed" && (
            <>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
