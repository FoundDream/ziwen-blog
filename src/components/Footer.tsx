const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Ziwen. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 