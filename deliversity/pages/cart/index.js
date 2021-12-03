export default function Cart() {
    return (
        <div>
          <div className="container mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded overflow-hidden shadow-lg m-4 bg-white md:col-span-2 lg:col-span-3">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
                <hr className="my-2" />
                <div className="font-bold text-xl mb-2 py-2">Status: </div>
                  <div class=" flex space-x-4">
                    <div class="h-4 bg-red-500 rounded w-1/3"></div>
                    <div class="h-4 bg-red-500 animate-pulse rounded w-1/3"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                  
                </div>
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg m-4 bg-white">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      );
    }
    