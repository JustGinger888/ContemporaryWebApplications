import Link from "next/link";
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';

export default function MenuCard({ item, id }) {
  const val = (item.val / 100).toFixed(2);
  console.log(id);
  const { addItem, removeItem } = useShoppingCart();

  return (
    <div className="rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.name}</div>
        <p className="text-gray-700 text-base">{item.desc}</p>
        <div className="font-bold text-xl mb-2">£{val}</div>
      </div>
      <div className="px-4 pb-2">
        <button
          className="inline-block px-3 py-2 my-1 text-md font-semibold text-center w-full text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
          onClick={() => addItem({
            "name": item.name,
      "price": item.val,
      "sku": item.sku,
      "image": item.url,
      "attribution": "Photo",
      "currency": "GBP"
          })}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
