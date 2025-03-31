import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "./ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  src,
  title,
  description,
  technologies = [],
  githubLink,
  liveLink,
  isComingSoon,
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      id="features"
      ref={cardRef}
      className="relative size-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline // Add this for better mobile support
        className={`absolute left-0 top-0 size-full object-cover object-center transition-all duration-500 ${
          isHovered ? "scale-110 blur-sm" : ""
        }`}
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-3 sm:p-4 md:p-5 text-blue-50 bg-gradient-to-t from-black/80 to-transparent">
        <div>
          <h1 className="bento-title special-font text-lg sm:text-xl md:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 sm:mt-3 max-w-64 text-xs sm:text-sm md:text-base">
              {description}
            </p>
          )}

          {technologies.length > 0 && (
            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs bg-blue-500/20 rounded-full backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-50 hover:text-blue-300 transition-colors"
            >
              <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-50 hover:text-blue-300 transition-colors"
            >
              <FaExternalLinkAlt className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20 w-3 h-3 sm:w-4 sm:h-4" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current.children, {
      y: 100,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none ",
      },
    });
  }, []);

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div
          ref={headerRef}
          className="px-5 py-32 max-w-2xl"
        >
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-zentry font-black text-blue-50 special-font">
              Featured <b>Projects</b>
            </h2>
            <div className="h-1 w-32 bg-violet-300 rounded-full mt-4"></div>
          </div>

          <p className="font-circular-web text-base sm:text-lg md:text-xl text-blue-50/70 leading-relaxed">
            A showcase of my recent work, featuring full-stack applications,
            interactive experiences, and innovative solutions.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                Project <b>One</b>
              </>
            }
            description="A full-stack e-commerce platform built with Next.js, featuring real-time updates and seamless payment integration."
            technologies={["Next.js", "Node.js", "MongoDB", "Stripe"]}
            githubLink="https://github.com/yourusername/project-one"
            liveLink="https://project-one.com"
          />
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  AI <b>Assistant</b>
                </>
              }
              description="An AI-powered coding assistant that helps developers write better code faster."
              technologies={["Python", "OpenAI", "React", "FastAPI"]}
              githubLink="https://github.com/yourusername/ai-assistant"
              liveLink="https://ai-assistant.com"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  Social <b>Hub</b>
                </>
              }
              description="A real-time social platform for developers to collaborate and share ideas."
              technologies={["React", "Firebase", "WebSocket", "Tailwind"]}
              githubLink="https://github.com/yourusername/social-hub"
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  Data <b>Viz</b>
                </>
              }
              description="Interactive data visualization dashboard for complex datasets."
              technologies={["D3.js", "Vue.js", "Express", "PostgreSQL"]}
              githubLink="https://github.com/yourusername/data-viz"
              liveLink="https://data-viz.com"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-gradient-to-br from-violet-400 to-violet-600 p-5">
              <h1 className="bento-title special-font max-w-64 text-white">
                View <b>More</b> on <b>GitHub</b>
              </h1>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="self-end hover:scale-110 transition-transform"
              >
                <FaGithub className="m-5 scale-[3] text-white" />
              </a>
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
      <div className="relative flex justify-center mt-20">
        <ScrollIndicator
          onClick={() => {
            const storySection = document.querySelector("#story");
            storySection?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </section>
  );
};

export default Features;
