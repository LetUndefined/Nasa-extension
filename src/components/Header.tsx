const Header = () => {
  return (
    <>
      <div className="border-b border-[var(--border-bright)] py-2" style={{ fontFamily: "var(--font-display)" }}>
        <div className="mx-4  flex justify-between items-center ">
          <h4 className="text-[var(--cyan)] uppercase text-[14px] tracking-[0.2rem] font-bold [text-shadow:0_0_10px_var(--cyan)]">Nasa Control</h4>
          <h4 className="text-[var(--green)] uppercase text-[10px]  tracking-[0.1rem] font-bold ">Live</h4>
        </div>
      </div>
    </>
  );
};

export default Header;
