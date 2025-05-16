const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <a
        href="/"
        className="group flex items-center gap-2 font-medium transition-all duration-300 ease-out"
      >
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-7 w-7 rounded flex items-center justify-center transition-all duration-300 ease-out group-hover:shadow-lg group-hover:shadow-blue-500/20">
          <span className="text-[10px] font-bold uppercase">IR</span>
        </div>
        <span className="text-lg font-medium tracking-tight transition-all duration-300 group-hover:text-blue-400">
          Instant
          <span className="text-zinc-400 group-hover:text-white">.run</span>
        </span>
      </a>
    </div>
  );
};

export default Logo;
