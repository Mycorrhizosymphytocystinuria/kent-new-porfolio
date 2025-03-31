import { useAtom } from "jotai";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiCalendar,
} from "react-icons/fi";
import { formStateAtom, isLoadingAtom } from "../atoms/contactAtoms";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScheduleModal from "./ScheduleModal";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="relative w-full">
    <label
      htmlFor={name}
      className="absolute -top-2.5 left-3 bg-black px-2 text-sm text-violet-300"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required // Add required for basic validation
      className="w-full rounded-lg border border-violet-300/20 bg-transparent px-4 py-3 text-blue-50 outline-none transition-all duration-300 placeholder:text-blue-50/30 focus:border-violet-300"
    />
  </div>
);

const Contact = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const form = useRef();
  const [formState, setFormState] = useAtom(formStateAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }).from(
      contentRef.current,
      {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { from_name, reply_to, subject, message } = formState;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !from_name.trim() ||
      !reply_to.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (!emailRegex.test(reply_to)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    emailjs
      .send(
        "service_pkcq2fj",
        "template_cnsdlxr",
        formState,
        "rQaeL1Sxy44RcwXGP"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.status, result.text);
          setIsSuccess(true);
          toast.success("Message sent successfully!");
          setFormState({
            from_name: "",
            reply_to: "",
            subject: "",
            message: "",
          });
          setTimeout(() => setIsSuccess(false), 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message. Please try again.");
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      ref={containerRef}
      id="contact"
      className="relative my-32 w-screen px-6 md:px-10"
    >
      <Toaster position="top-right" />

      {/* Gradient Orbs */}
      <div className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-violet-300/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-br from-black to-violet-950 p-2">
        <div className="relative rounded-[1.7rem] border border-white/10 bg-black/90 px-6 py-20 backdrop-blur-xl md:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Image and CTA Section */}
            <div
              ref={imageRef}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative size-64 overflow-hidden rounded-lg">
                <video
                  src="videos/feature-4.mp4"
                  loop
                  muted
                  autoPlay
                  playsInline
                  className="w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-violet-400 mb-4">
                  Let's Create Something Amazing
                </h3>
                <p className="text-blue-50/80 mb-6">
                  Ready to start your next project? We're here to help turn your
                  vision into reality.
                </p>
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gray-600 text-gray-300 rounded-lg cursor-not-allowed opacity-75"
                >
                  <FiCalendar className="h-5 w-5" />
                  Schedule a Call
                  <span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </button>
              </div>
            </div>

            {/* Form Section */}
            <div
              ref={contentRef}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <p className="mb-6 inline-block rounded-full bg-violet-300/10 px-4 py-1.5 font-general text-sm uppercase tracking-wider text-violet-300">
                Let's Connect
              </p>

              <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">
                Get in <span className="text-violet-400">Touch</span>
              </h2>

              <p className="mt-4 max-w-xl text-lg text-blue-50/80">
                Have a question or want to work together? Drop me a message!
              </p>

              <form
                ref={form}
                onSubmit={sendEmail}
                className="mt-12 w-full max-w-2xl space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <InputField
                    label="Your Name"
                    name="from_name"
                    value={formState.from_name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Your Email"
                    name="reply_to"
                    type="email"
                    value={formState.reply_to}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>

                <InputField
                  label="Subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                />

                <div className="relative w-full">
                  <label
                    htmlFor="message"
                    className="absolute -top-2.5 left-3 bg-black px-2 text-sm text-violet-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    required
                    rows="5"
                    className="w-full rounded-lg border border-violet-300/20 bg-transparent px-4 py-3 text-blue-50 outline-none transition-all duration-300 placeholder:text-blue-50/30 focus:border-violet-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full overflow-hidden rounded-lg bg-violet-500 px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70
                  ${isSuccess ? "bg-green-500 hover:bg-green-600" : ""}`}
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      <>
                        <FiSend className="transition-transform duration-300 group-hover:translate-x-1" />
                        {isSuccess ? "Message Sent!" : "Send Message"}
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Social Links */}
              <div className="mt-16 flex items-center gap-6">
                <a
                  href="https://github.com/Masterkent11"
                  className="group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub className="h-6 w-6 text-blue-50/50 transition-colors duration-300 group-hover:text-violet-300" />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="group"
                >
                  <FiMail className="h-6 w-6 text-blue-50/50 transition-colors duration-300 group-hover:text-violet-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kent-ashley-clementir-776090217/"
                  className="group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiLinkedin className="h-6 w-6 text-blue-50/50 transition-colors duration-300 group-hover:text-violet-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Contact;
