import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function EnterPage() {
    return (
        <div>
            <Navbar/>
            <Loader show/>
        </div>
    );
}