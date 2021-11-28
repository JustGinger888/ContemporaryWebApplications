// Loading Spinner
export default function Loader({ show }) {
    return show ? <div class="flex justify-center items-center">
    <div
      class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
    ></div>
  </div> : null;
  }