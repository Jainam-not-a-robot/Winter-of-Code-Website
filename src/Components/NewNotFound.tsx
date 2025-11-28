import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { motion } from 'framer-motion';

const NewNotFound = () => {
  return (
    <div className="bg-deep-night text-frost-white min-h-screen relative overflow-x-hidden">
      

      {/* 404 Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center px-6 pt-24 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-ice-surge/20 blur-[50px] rounded-full"></div>
          <h1 className="relative text-9xl font-semibold text-white tracking-tighter opacity-10">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-24 h-24 text-frost-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12l.01 0M12 12l.01 0M16 12l.01 0"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-3 tracking-tight">
            Lost in the blizzard?
          </h2>
          <p className="text-cloud-gray max-w-md mb-8 leading-relaxed">
            The page you are looking for has been buried under the snow. Let's get you back to warmth.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NewNotFound;
