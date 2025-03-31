import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";
import { FiCode, FiLayout, FiSmartphone, FiGlobe } from "react-icons/fi";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import SplitType from "split-type";
import ScrollIndicator from "./ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <FiCode />,
    title: "Web Development",
    description:
      "Creating responsive and dynamic web applications with cutting-edge technologies and modern frameworks. Our expertise spans across React, Next.js, and other modern tools to deliver exceptional web experiences.",
    bgColor: "from-blue-400/20 to-purple-400/20",
    iconColor: "text-blue-600",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    ],
    imagePosition: "left",
  },
  {
    icon: <FiLayout />,
    title: "UI/UX Design",
    description:
      "Crafting beautiful, intuitive interfaces that deliver exceptional user experiences and engagement. We focus on user-centered design principles to create interfaces that are both beautiful and functional.",
    bgColor: "from-purple-400/20 to-pink-400/20",
    iconColor: "text-purple-600",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1622542796254-5b9c46a259b8?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop&q=60",
    ],
    imagePosition: "right",
  },
  {
    icon: <FiSmartphone />,
    title: "Mobile Apps",
    description:
      "Building powerful cross-platform mobile applications that perform seamlessly across devices. Using React Native and Flutter to create native-like experiences for both iOS and Android platforms.",
    bgColor: "from-pink-400/20 to-red-400/20",
    iconColor: "text-pink-600",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=800&auto=format&fit=crop&q=60",
    ],
    imagePosition: "left",
  },
  {
    icon: <FiGlobe />,
    title: "Full Stack",
    description:
      "Delivering end-to-end web solutions with robust backend systems and elegant frontends. Our full-stack expertise ensures seamless integration between all layers of your application.",
    bgColor: "from-red-400/20 to-orange-400/20",
    iconColor: "text-red-600",
    images: [
      "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1603322199363-14380ec2ba31?w=800&auto=format&fit=crop&q=60",
    ],
    imagePosition: "right",
  },
];

const ServiceCard = ({ service, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === service.images.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [service.images.length]);

  // GSAP animation for image transition
  useEffect(() => {
    gsap.to(imageRef.current, {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        gsap.to(imageRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      },
    });
  }, [currentImageIndex]);

  useGSAP(() => {
    // Split text animations
    const titleText = new SplitType(titleRef.current, { types: "chars" });
    const descriptionText = new SplitType(descriptionRef.current, {
      types: "words",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.from(cardRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        titleText.chars,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.02,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .from(
        descriptionText.words,
        {
          opacity: 0,
          y: 20,
          stagger: 0.01,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      titleText.revert();
      descriptionText.revert();
    };
  }, []);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative my-16 flex flex-col items-center gap-6 overflow-hidden md:my-24 lg:my-48 lg:flex-row lg:items-stretch lg:gap-16 ${
        service.imagePosition === "right" ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section with Carousel */}
      <div className="relative w-full overflow-hidden lg:w-1/2">
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl sm:h-[200px] lg:h-[350px]">
          <img
            ref={imageRef}
            src={service.images[currentImageIndex]}
            alt={`${service.title} ${currentImageIndex + 1}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-40`}
          />

          {/* Carousel Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 transform gap-1.5 sm:bottom-4 sm:gap-2">
            {service.images.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                  currentImageIndex === dotIndex
                    ? "w-5 bg-white sm:w-6"
                    : "w-1.5 bg-white/50 sm:w-2"
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? service.images.length - 1 : prev - 1
              )
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/20 p-1.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/40 sm:left-4 sm:p-2"
            aria-label="Previous image"
          >
            <TiLocationArrow className="h-4 w-4 rotate-180 transform sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === service.images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/20 p-1.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/40 sm:right-4 sm:p-2"
            aria-label="Next image"
          >
            <TiLocationArrow className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full flex-col justify-center px-2 sm:px-4 lg:w-1/2 lg:px-0">
        <div className="relative">
          {/* Icon */}
          <div className="card-icon mb-4 inline-block sm:mb-6 lg:mb-1">
            <div className="relative rounded-xl border-2 border-violet-300/20 bg-white/80 p-4 backdrop-blur-sm sm:rounded-2xl sm:p-5 lg:p-3">
              <div
                className={`text-3xl sm:text-4xl lg:text-2xl ${service.iconColor}`}
              >
                {service.icon}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3
            ref={titleRef}
            className="special-font mb-3 font-zentry text-3xl font-black uppercase tracking-wide text-gray-900 animate-text sm:mb-4 sm:text-4xl lg:mb-6 lg:text-5xl lg:tracking-wider"
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="font-circular-web text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl"
          >
            {service.description}
          </p>

          {/* Button */}
          <Button
            title="Learn More"
            rightIcon={<TiLocationArrow />}
            containerClass="mt-6 bg-violet-300 flex-center gap-1 hover:bg-violet-400 text-sm sm:text-base lg:mt-8"
          />
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-blue-50 py-16 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 text-center sm:mb-20 lg:mb-24">
          <p className="mb-3 font-general text-xs uppercase tracking-[0.2em] text-violet-300 sm:mb-4 sm:text-sm sm:tracking-[0.3em]">
            Our Services
          </p>
          <AnimatedTitle
            title="What We <b>O</b>ffer"
            containerClass="!text-black text-center"
          />
        </div>

        {/* Services */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
