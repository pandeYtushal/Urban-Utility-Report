import { useNavigate } from "react-router-dom";
import { Droplets, Trash2, Lightbulb, AlertTriangle } from "lucide-react";
import sewageImg from "/sewage.png";
import garbageImg from "/garbage.png";
import streetlightImg from "/streetlight.png";
import otherImg from "/fault.png";

export default function Home() {
  const navigate = useNavigate();

  const handleReportClick = (type) => {
    navigate(`/report?issue=${type}`);
  };

  const Card = ({ img, color, title, desc, icon: Icon, type }) => (
    <div
      onClick={() => handleReportClick(type)}
      className="backdrop-blur-md bg-[rgba(19,19,19,0.5)] border border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group 
                 w-64 h-88 sm:w-72 sm:h-92 md:w-80 md:h-96 lg:w-96 lg:h-104 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className="absolute inset-0 transition-all group-hover:opacity-80"
          style={{ backgroundColor: color, opacity: 0.4 }}
        ></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col flex-1 items-center justify-center p-4 sm:p-5 md:p-6 space-y-2 bg-linear-to-b from-white to-gray-50">
        <Icon
          size={40}
          className="text-gray-800 sm:w-12 sm:h-12 md:w-14 md:h-14"
        />
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 text-center max-w-[200px] sm:max-w-[250px] md:max-w-[280px]">
          {desc}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-12 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/hero.png')`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[rgba(19,19,19,0.85)] backdrop-blur-sm z-0"></div>

      <div className="relative z-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          Urban Utility Reporter
        </h1>
        <p className="text-gray-300 mb-12 text-center max-w-lg text-sm sm:text-base md:text-lg">
          Report issues like sewage leaks, garbage accumulation, and streetlight
          faults directly to your local authorities.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          <Card
            img={sewageImg}
            icon={Droplets}
            title="Sewage Issue"
            desc="Report blocked or leaking drains"
            type="Sewage"
          />
          <Card
            img={garbageImg}
            icon={Trash2}
            title="Garbage Issue"
            desc="Report uncollected garbage or dumps"
            type="Garbage"
          />
          <Card
            img={streetlightImg}
            icon={Lightbulb}
            title="Streetlight Fault"
            desc="Report broken or non-working lights"
            type="Streetlight"
          />
          <Card
            img={otherImg}
            icon={AlertTriangle}
            title="Other Faults"
            desc="Report other civic issues"
            type="Other"
          />
        </div>
      </div>
    </div>
  );
}
