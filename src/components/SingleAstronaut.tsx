const SingleAstronaut = ({ name }: { name: string }) => {
  return (
    <h4 className=" text-[0.6rem] text-white/70" style={{ fontFamily: "var(--font-display)" }}>
      {name}
    </h4>
  );
};

export default SingleAstronaut;
