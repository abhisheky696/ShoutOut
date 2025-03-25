import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-[50%] flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">Coming Soon</h1>
      <Link
        to="/"
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
