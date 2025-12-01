import { useNavigate } from "react-router-dom";
import { Droplets, Trash2, Lightbulb, AlertTriangle } from "lucide-react";
import { motion as Motion } from "framer-motion";
import sewageImg from "/sewage.png";
import garbageImg from "/garbage.png";
import streetlightImg from "/streetlight.png";
import otherImg from "/fault.png";

export default function Home() {
  const navigate = useNavigate();

  const handleReportClick = (type) => {
    navigate(`/report?issue=${type}`);
  };

  const Card = ({ img, color, title, desc, icon: Icon, type, index }) => (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleReportClick(type)}
      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl 
                 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 
                 cursor-pointer group w-full sm:w-72 md:w-80 flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-3xl">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
        <div className="absolute inset-0 transition-all group-hover:opacity-90" style={{ backgroundColor: color, opacity: 0.4 }}></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.2 }}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
        >
          <Icon size={24} className="text-white" />
        </Motion.div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col flex-1 items-center justify-center p-6 sm:p-7 space-y-3 bg-linear-to-b from-white/10 to-white/5 backdrop-blur-lg">
        <Motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + index * 0.2 }}
          className="text-xl sm:text-2xl font-bold text-white text-center drop-shadow-md"
        >
          {title}
        </Motion.h2>
        <Motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + index * 0.2 }}
          className="text-sm sm:text-base text-gray-200 text-center max-w-64 sm:max-w-[280px] leading-relaxed"
        >
          {desc}
        </Motion.p>
      </div>
    </Motion.div>
  );

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-4 py-16 sm:py-20 md:py-24 relative"
      style={{ backgroundImage: `url('/hero.png')` }} >
      {/* Enhanced Overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Heading */}
        <Motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-2xl"
        >
          Urban Utility Reporter
        </Motion.h1>

        <Motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-200 mb-12 sm:mb-16 text-center max-w-lg sm:max-w-xl md:max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-lg"
        >
          Report issues like sewage leaks, garbage accumulation, and streetlight
          faults directly to your local authorities — helping make your city cleaner,
          brighter, and safer.
        </Motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 md:gap-12 w-full max-w-7xl justify-items-center">
          <Card
            img={sewageImg}
            icon={Droplets}
            color="rgba(56,189,248,0.6)"
            title="Sewage Issue"
            desc="Report blocked or leaking drains in your area."
            type="Sewage"
            index={0}
          />
          <Card
            img={garbageImg}
            icon={Trash2}
            color="rgba(34,197,94,0.6)"
            title="Garbage Issue"
            desc="Report uncollected garbage or overflowing dumps."
            type="Garbage"
            index={1}
          />
          <Card
            img={streetlightImg}
            icon={Lightbulb}
            color="rgba(250,204,21,0.6)"
            title="Streetlight Fault"
            desc="Report broken or non-working streetlights."
            type="Streetlight"
            index={2}
          />
          <Card
            img={otherImg}
            icon={AlertTriangle}
            color="rgba(239,68,68,0.6)"
            title="Other Faults"
            desc="Report any other civic or utility issue."
            type="Other"
            index={3}
          />
        </div>
      </div>
    </div>
  );
}
