import { useContext } from "react";
import { AstronautContext } from "../context/AstronautDataContext";
import SingleAstronaut from "./SingleAstronaut";
import Loading from "./Loading";

const Astronauts = () => {
  const context = useContext(AstronautContext);

  return (
    <>
      {context?.loading ? (
        <Loading />
      ) : (
        context?.data?.people.map((astronaut) => (
          <div key={astronaut.name} className="bg-[var(--green)]/5 border-l border-[var(--green)]/50 flex justify-between items-center px-4 py-2  ">
            <div>
              <SingleAstronaut name={astronaut.name} />
            </div>
            <div className="border border-[var(--border-bright)] text-[var(--border-bright)] flex items-center justify-center">
              <span className=" font-bold px-1 text-[0.6rem]  ">ISS</span>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Astronauts;
