import "./App.css";
import Header from "./components/Header";
import HumanOrbit from "./components/HumanOrbit";
import { AstronautsDataProvider } from "./context/AstronautsDataProvider";
import Astronauts from "./components/Astronauts";
import ProgressBar from "./components/ProgressBar";

function App() {
  return (
    <>
      <AstronautsDataProvider>
        <div className="w-[380px] h-[600px] bg-[var(--bg)] border border-[var(--border-bright)]">
          <header>
            <Header />
          </header>
          <section className="border-b border-[var(--border-bright)] pb-6 ">
            <div className="mx-4 mt-4 ">
              <h5 className="text-[var(--cyan)]/20 uppercase text-[10px] tracking-[0.2rem]" style={{ fontFamily: "var(--font-display)" }}>
                Crew Manifest
              </h5>
              <HumanOrbit />
              <div className="flex gap-2 flex-col overflow-y-scroll h-[10rem] border border-[var(--border-bright)]/40 p-2 ">
                <Astronauts />
              </div>
            </div>
          </section>
          <section className="border-b border-[var(--border-bright)] pb-6">
            <div className="mx-4 mt-4 ">
              <h5 className="text-[var(--cyan)]/20 uppercase text-[10px] tracking-[0.2rem]" style={{ fontFamily: "var(--font-display)" }}>
                ISS system status
              </h5>
              <ProgressBar />
            </div>
          </section>
          <footer className="flex justify-end items-center mt-1 mr-2">
            <span className="text-[var(--grey)] " style={{ fontFamily: "var(--font-display)" }}>
              V1.2
            </span>
          </footer>
        </div>
      </AstronautsDataProvider>
    </>
  );
}

export default App;
