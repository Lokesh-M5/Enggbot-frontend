import { useState, useEffect } from "react";
import Chatbot from "./components/Chatbot";
import Placements from "./pages/Placements";
import ATSScanner from "./components/ATSScanner";

import { motion } from "framer-motion";

import {
  Bot,
  Sparkles,
  BrainCircuit,
  Menu,
  X
} from "lucide-react";

export default function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    window.scrollTo(0, 0);

    if (window.location.hash) {

      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );

    }

  }, []);

  const scrollToSection = (id) => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth"
      });

    setMenuOpen(false);

  };

  return (

    <div className="min-h-screen gradient-bg text-white relative overflow-hidden">

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 w-full z-50 px-5 py-5">

        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-4">

          {/* LOGO */}

          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-2xl">

              <Bot size={24} />

            </div>

            <div>

              <h1 className="logo-font text-2xl tracking-wide">
                EnggBot
              </h1>

              <p className="text-xs text-gray-400">
                AI Career Mentor
              </p>

            </div>

          </button>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-10 nav-font">

            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-violet-300 transition"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-violet-300 transition"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("placements")}
              className="hover:text-violet-300 transition"
            >
              Placements
            </button>

          </div>

          {/* START CHAT BUTTON */}

          <button
            type="button"
            onClick={() => scrollToSection("chatbot")}
            className="
            hidden md:block
            bg-white
            text-black
            px-5
            py-2
            rounded-full
            font-semibold
            hover:scale-105
            transition
            "
          >

            Start Chatting

          </button>

          {/* MOBILE MENU BUTTON */}

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >

            {menuOpen
              ? <X size={28} />
              : <Menu size={28} />
            }

          </button>

        </div>

        {/* MOBILE MENU */}

        {menuOpen && (

          <div className="md:hidden mt-4 glass px-6 py-6 flex flex-col gap-6 nav-font animate-fade">

            <button
              onClick={() => scrollToSection("home")}
              className="text-left hover:text-violet-300 transition"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="text-left hover:text-violet-300 transition"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("chatbot")}
              className="text-left hover:text-violet-300 transition"
            >
              AI Chatbot
            </button>

            <button
              onClick={() => scrollToSection("placements")}
              className="text-left hover:text-violet-300 transition"
            >
              Placements
            </button>

          </div>

        )}

      </nav>

      {/* HERO SECTION */}

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6"
      >

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl text-center"
        >

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity
            }}
            className="
            inline-flex
            mb-8
            items-center
            gap-3
            glass
            px-5
            py-3
            rounded-full
            "
          >

            <Sparkles className="text-violet-300" />

            <span className="text-sm tracking-wide">
              Personalized AI Career Guidance
            </span>

          </motion.div>

          <h1 className="hero-title text-6xl md:text-8xl font-bold leading-tight">

            Build Your

            <span className="block bg-gradient-to-r from-violet-400 via-blue-300 to-cyan-300 text-transparent bg-clip-text">

              Dream Tech Career

            </span>

          </h1>

          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">

            EnggBot analyzes your skills,
            compares them with industry demands,
            and creates a personalized roadmap
            to make you placement ready.

          </p>

          <div className="mt-12 flex flex-wrap gap-5 justify-center">

            <button
              className="
              px-8
              py-4
              rounded-3xl
              glass
              hover:bg-white/10
              transition
              "
            >

              Explore AI Courses - Coming Soon

            </button>

          </div>

        </motion.div>

        {/* ANIMATED CIRCLES */}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="
          absolute
          w-[500px]
          h-[500px]
          rounded-full
          border
          border-violet-500/20
          "
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="
          absolute
          w-[700px]
          h-[700px]
          rounded-full
          border
          border-blue-500/10
          "
        />

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="px-8 pb-24"
      >

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {[
            "AI Skill Analysis",
            "Placement Roadmaps",
            "Programming AI Tutor"
          ].map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -12 }}
              className="glass rounded-3xl p-8"
            >

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mb-6">

                <BrainCircuit />

              </div>

              <h2 className="text-2xl font-semibold mb-4">
                {item}
              </h2>

              <p className="text-gray-400 leading-relaxed">

                Personalized AI-powered guidance
                designed specifically for
                engineering students.

              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* CHATBOT */}

      <section
        id="chatbot"
        className="px-6 pb-32"
      >
        <section
  className="
  px-6
  pb-20
  "
>

  <div
    className="
    max-w-7xl
    mx-auto
    "
  >

    <ATSScanner />

  </div>

</section>

        <Chatbot />

      </section>

      {/* PLACEMENTS */}

      <section
        id="placements"
        className="px-6 pb-32"
      >

        <Placements />

      </section>

    </div>

  );

}