const Header = () => {
  return (
    <div className="flex items-center justify-between px-8 py-5 bg-white">
      <img src="/app-icon.svg" alt="" />

      <div className="flex items-center gap-6">
        <img src="/notification-icon.svg" alt="" />
        <p className="text-sm">Samu Joe</p>

        <p className="text-sm h-10 w-10 flex items-center justify-center rounded-full bg-[#22A08E] text-white font-semibold">
          SJ
        </p>
      </div>
    </div>
  );
};

export default Header;
