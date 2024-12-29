import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">页面不存在</p>
      <Link
        to="/"
        className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
};

export default NotFound;
