export default function Cart() {
  return (
    <div>
      <div className="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded overflow-hidden shadow-lg my-4 mx-2 bg-white md:col-span-2 lg:col-span-3">
            <div className="px-6 py-4 h-auto md:h-screen mx-2 md:mx-8 lg:mx-48 flex flex-wrap content-center">
              <div className="font-bold text-xl mb-2 w-full py-4 text-center text-red-500">
                Details
              </div>
              <input
                type="text"
                name="email"
                className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                placeholder="Full Name"
              />
              <input
                type="text"
                name="number"
                className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                placeholder="Contact Number"
              />
              <input
                type="text"
                name="room"
                className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-red-500 focus:outline-none"
                placeholder="University Room"
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
            <div className="font-bold text-xl mb-2 py-4 text-red-500">
                Basket
              </div><div class="grid grid-cols-2">
                <div>1x Item</div>
                <div className="text-right " >9</div>
              </div>
              <hr className="my-2" />
              <div class="grid grid-cols-2">
                <div>Subtotal</div>
                <div className="text-right ">9</div>
                <div>Delivery</div>
                <div className="text-right ">9</div>
                <div>Service</div>
                <div className="text-right ">9</div>
              </div>

              <hr className="my-2" />
              <div class="grid grid-cols-2">
                <div>Total</div>
                <div className="text-right ">9</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

