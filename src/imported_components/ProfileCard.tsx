import { useRef, useState, useEffect, MouseEvent, FocusEvent } from "react";
import { Github, Linkedin } from "lucide-react";

type ProfileCardProps = {
  image_link: string;
  mentor_name: string;
  about: string;
  linkedinID: string;
  githubID: string;
};

const ProfileCard = ({
  image_link,
  mentor_name,
  about,
  linkedinID,
  githubID
}: ProfileCardProps) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [imgSrc, setImgSrc] = useState(image_link);
  const [hasError, setHasError] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate random background position for sky image
    setBgPosition({
      x: Math.random() * 100,
      y: Math.random() * 100
    });
  }, []);

  const spotlightColor = "rgba(62, 91, 222, 0.25)";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleFocus = (_e: FocusEvent<HTMLDivElement>) => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = (_e: FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(0.6);
  const handleMouseLeave = () => setOpacity(0);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/avatar.png");
    }
  };

  const linkClass =
    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 bg-white/20 hover:bg-white/30 text-white";

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      className="relative rounded-3xl border border-neutral-800 overflow-hidden p-8 w-80 text-white shadow-2xl m-10  cursor-pointer"
      style={{
        backgroundImage: "url('/sky.png')",
        backgroundSize: "cover",
        backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-neutral-900/70" />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full ring-3 ring-neutral-700/20 p-1 transition-all duration-300 group-hover:scale-110">
            <img
              src={imgSrc}
              alt={mentor_name}
              className="w-full h-full rounded-full object-cover shadow-lg"
              onError={handleImageError}
            />
          </div>
        </div>

        <h3 className="font-bold text-2xl mb-3 text-white">{mentor_name}</h3>

        <p className="leading-relaxed mb-6 text-white/90">
          {about}
        </p>

        <div className="flex justify-center gap-3 mb-6">
          <a
            href={githubID}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a
            href={linkedinID}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;