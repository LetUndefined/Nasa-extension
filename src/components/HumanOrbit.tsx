import { useContext } from "react";
import { AstronautContext } from "../context/AstronautDataContext";

const HumanOrbit = () => {
  const data = useContext(AstronautContext);
  return (
    <>
      <div className="flex items-center gap-2">
        <div className=" flex items-center">
          <span className="text-[var(--cyan)] text-[3rem] font-bold [text-shadow:0_0_10px_var(--cyan)] ">{data?.number}</span>
        </div>
        <div>
          <h4 className="text-white text-[12px] uppercase">Humans in orbit</h4>
          <h4 className="text-[var(--grey)] text-[10px] uppercase ">International space station</h4>
        </div>
      </div>
    </>
  );
};

export default HumanOrbit;
