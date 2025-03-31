import { useRef, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/kent-ashley-clementir-776090217",
    icon: <FaLinkedin />,
    label: "Linkedin",
  },
  {
    href: "https://www.upwork.com/freelancers/~01eebc38b17d75dfab",
    icon: <FaUpwork />,
    label: "Upwork",
  },
];

const Footer = () => {
  const footerRef = useRef(null);
  const socialRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced line animation
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
        },
      });

      // Enhanced social icons animation
      gsap.from(socialRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
        },
      });

      // Enhanced text elements animation
      gsap.from(".footer-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-screen bg-gradient-to-br from-violet-950 via-violet-900 to-violet-800 py-20 text-white"
    >
      {/* Enhanced decorative line */}
      <div
        ref={lineRef}
        className="absolute top-0 h-[3px] w-full bg-gradient-to-r from-violet-500/0 via-violet-400 to-violet-500/0"
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {/* Enhanced Logo and Copyright */}
          <div className="flex flex-col items-center gap-6 md:items-start">
            <div className="group relative">
              <div className="absolute -inset-2 rounded-full bg-violet-400/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              <img
                src="/img/logo.png"
                alt="Ken tech"
                className="relative h-14 w-14 rounded-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="footer-text text-sm font-light text-violet-200/90">
              @Ken Tech 2025. All rights reserved
            </p>
          </div>

          {/* Enhanced Social Links */}
          <div
            ref={socialRef}
            className="flex flex-col items-center gap-8 md:items-center"
          >
            <h3 className="footer-text text-xl font-semibold text-violet-100">
              Connect With Us
            </h3>
            <div className="flex gap-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={link.label}
                >
                  <div className="absolute -inset-3 rounded-full bg-violet-400/20 opacity-0 blur transition-all duration-300 group-hover:opacity-100" />
                  <div className="absolute -inset-2 rounded-full bg-violet-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative transform text-2xl text-violet-200 transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-white">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="flex flex-col items-center gap-6 md:items-end">
            <h3 className="footer-text text-xl font-semibold text-violet-100">
              Quick Links
            </h3>
            <div className="flex flex-col items-center gap-4 md:items-end">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (text, index) => (
                  <a
                    key={index}
                    href={`#${text.toLowerCase().replace(/\s+/g, "-")}`}
                    className="footer-text group relative text-sm text-violet-200/90 transition-colors duration-300"
                  >
                    <span className="relative">
                      {text}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-violet-300 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
