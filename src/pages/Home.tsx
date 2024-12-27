import { FaGithub } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Hi, I'm Ziwen 👋
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Minzu University of China | A Frontend Developer
        </p>
        <a 
          href="https://github.com/FoundDream" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          <FaGithub size={20} />
          GitHub
        </a>
      </section>

      {/* About Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">What I Do👇</h2>
        <div className="text-lg max-w-none">
          <p className="mb-4">
                我是一名前端开发者，热爱编程和开源文化。目前正就读于中央民族大学（Minzu University of China）,
                曾实习在&#20;<a href="https://www.tk.cn/" className="text-green-900 relative inline-block hover:after:top-[20%] after:content-[''] after:absolute after:z-[-1] after:top-[66%] after:left-[-0.1em] after:right-[-0.1em] after:bottom-0 after:transition-[top] after:duration-200 after:ease-[cubic-bezier(0,0.8,0.13,1)] after:bg-[rgba(79,192,141,0.5)] decoration-transparent">@泰康在线</a>
            ，目前实习在&#20;<a href="https://www.meituan.com/" className="text-amber-500 relative inline-block hover:after:top-[20%] after:content-[''] after:absolute after:z-[-1] after:top-[66%] after:left-[-0.1em] after:right-[-0.1em] after:bottom-0 after:transition-[top] after:duration-200 after:ease-[cubic-bezier(0,0.8,0.13,1)] after:bg-[rgba(79,192,141,0.5)] decoration-transparent">@美团</a>。
          </p>
          <p className="mb-4">
            这个博客是我用来记录学习笔记、技术心得和生活感悟的地方。
            希望通过写作和分享，能够帮助到其他开发者，也希望自己不断进步。
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div 
              key={skill.name}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">{skill.name}</h3>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Let's Contact</h2>
        <p className="text-gray-600 text-md mb-4">
        很开心可以和你合作和学习。如果你想与我联系或一起讨论日常，欢迎通过&#20;
        <a href="/contact" className="relative inline-block hover:after:top-[20%] after:content-[''] after:absolute after:z-[-1] after:top-[66%] after:left-[-0.1em] after:right-[-0.1em] after:bottom-0 after:transition-[top] after:duration-200 after:ease-[cubic-bezier(0,0.8,0.13,1)] after:bg-[rgba(79,192,141,0.5)]"> Contact Page </a>
        &#20;联系我。希望我的存在可以让世界变得更好一些。
        </p>
      </section>
    </div>
  );
};

const skills = [
  {
    name: "Frontend",
    description: "Vue, React, TypeScript, Tailwind CSS"
  },
  {
    name: "Backend",
    description: "Node.js, Express, MongoDB"
  },
  {
    name: "Tools",
    description: "Git, VS Code, Cursor"
  },
  {
    name: "Learning",
    description: "Vite, Rollup, Webpack"
  },
  {
    name: "Other",
    description: "Linux, Docker, CI/CD"
  },
  {
    name: "Interests",
    description: "Hiphop Music, Valorant"
  }
];

export default Home; 