export default function Auth() {
  return (
    <div>
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row">
            <div className=" hidden lg:block relative h-screen w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
              <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
                <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                  <div className="relative">
                    <p className="mb-2 font-medium text-gray-700 uppercase">
                      Work smarter
                    </p>
                    <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                      Features to help you work smarter
                    </h2>
                  </div>
                  <p className="text-2xl text-gray-700">
                    We've created a simple formula to follow in order to gain
                    more out of your business and your application.
                  </p>
                  
                </div>
              </div>
            </div>

            <div className="w-full  bg-white lg:w-6/12 xl:w-5/12">
              <div className="flex  flex-col items-left justify-center w-full h-screen p-10 lg:p-16 xl:p-24">
                <div className="relative w-full mt-10 space-y-8">
                
                  <div className="relative">
                    <a
                      href="/auth/login"
                      className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 ease"
                    >
                      Create An Account
                    </a>
                    <a
                      href="/auth/login"
                      className="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease"
                    >
                      Already Registered?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
