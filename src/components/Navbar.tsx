import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white text-black shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Ziwen's Blog
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">
              首页
            </Link>
            <Link to="/blog" className="hover:text-gray-300">
              博客
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 